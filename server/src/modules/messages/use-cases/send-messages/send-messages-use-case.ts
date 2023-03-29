import { injectable } from "tsyringe";
import { Client } from "whatsapp-web.js";
import { AppError } from "../../../../shared/errors/AppError";
import { minimal_args } from "../../../../shared/helpers/web-whatsapp";
import { MessagesService } from "../../../websockets/messages/messages-service";
import { IContact, ISendMessagesRequestDTO } from "./i-send-messages-request-dto";

const timeout_generate_qrcode = 30000 // 30 seconfs
const timeout_scan_qrcode = 120000 // 2 minutes
// const timeout_generate_qrcode = 1

@injectable()
class SendMessagesUseCase {
    constructor() { }

    async execute({ sessionId, message, contacts }: ISendMessagesRequestDTO): Promise<any> {

        console.log('Starting send messages...');

        console.log('Creating new client...')

        const webWhatsappClient = new Client({
            authTimeoutMs: 60000,
            puppeteer: {
                headless: true,
                args: minimal_args,
            },
            qrMaxRetries: 10,
        })

        webWhatsappClient.initialize();

        console.log('Generating QR Code...');

        const qrCode = await new Promise(async (resolve, reject) => {

            var qrCodeGenerated: any = new Promise(async (resolve, reject) => {
                webWhatsappClient.once('qr', (qr: string) => {
                    resolve({ qrCode: qr })
                });
                setTimeout(() => {
                    reject({ message: 'QR Code cannot be generated.' });
                }, timeout_generate_qrcode)
            }).then(data => {
                return data
            }).catch((error) => { return error })

            resolve(qrCodeGenerated)

        }).then(data => {
            return data as string;
        }).catch((error) => { return error })

        if (qrCode.message) {
            webWhatsappClient.destroy();
            throw new AppError('QR Code cannot be generated.')
        }

        let messagesService = new MessagesService();
        messagesService.sendQrCode({ qrCode: qrCode!, session: sessionId })

        const connectionStatus: any = await new Promise(async (resolve, reject) => {

            webWhatsappClient.on('ready', async () => {
                await webWhatsappClient.getState().then((data: any) => {
                    console.log('checking if connected...', data)
                    if (data === 'CONNECTED') {
                        resolve({ status: true });
                        return true
                    } else {
                        resolve({ status: false });
                        return false
                    }
                });
            })

            setTimeout(() => {

                reject({
                    status: false,
                    message: 'Timeout! The Qr Code is not more valid.'
                });
            }, timeout_scan_qrcode)

        }).then(data => {
            return data
        }).catch((error) => {
            return error
        })

        console.log({ connectionStatus })

        if (connectionStatus.message && !connectionStatus.status) {
            webWhatsappClient.destroy();
            throw new AppError(connectionStatus.message)
        }

        messagesService.sendConnectionStatus({ connectionStatus, session: sessionId })

        if (connectionStatus) {
            const response = await new Promise(async (resolve, _reject) => {

                var sent = 0;
                var failed = 0;

                await Promise.all(contacts.map(async (contact: IContact) => {
                    try {
                        return new Promise<void>(async (resolve) => {
                            setTimeout(async () => {
                                const { phone } = contact;
                                console.log('Sending message to ' + phone);
                                const log = await sendMessage(webWhatsappClient, phone, message);
                                console.log('log: ' + JSON.stringify(log));
                                // TO DO: VALIDATION
                                sent++;
                                resolve()
                            }, 2000);
                        });

                    } catch (error) {
                        console.log('error: ' + error)
                        failed++;
                    }
                }))

                const total = {
                    messagesTotal: contacts.length,
                    messagesSent: sent,
                    // messagesFailed: contatos.length === sent ? 0 : contatos.length - sent
                    messagesFailed: failed,
                };

                resolve(total)
            }).then(data => {
                return data
            }).catch(() => { return false })

            // webWhatsappClient.destroy();

            return response
        }
    }
}

export { SendMessagesUseCase };


function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

const sendMessage = async (client: any, number: string, text: string) => {
    // number = number.replace('@c.us', '');
    number = `${number}@c.us`
    const result = await client.sendMessage(number, text);
    console.log('result: ', result)
    return result
}