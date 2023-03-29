import { IAuthenticationRequest } from '../../interfaces/IAuth';
import { TOKEN_KEY } from '../auth';
import { jsontowwServerAPI } from './apiClient'

type TError = {
    message: string;
    response: any
}

interface ISendMessagesRequest {
    unidade: string;
    mensagem: string;
    contatos: string;
    sessionId: string;
}

export async function sendMessages(data: ISendMessagesRequest): Promise<any> {
    try {

        const response = await jsontowwServerAPI.post(`/send-messages`, {
            ...data
        },);

        const result = { data: response.data, status: response.status }


        return result;

    } catch (error) {
        const reponseError = error as TError;
        // console.log('error', error)
        return {
            message: reponseError.response.data.message,
            status: reponseError.response.status
        }
    }
}

export async function generateQRCode(): Promise<any> {
    try {

        const response = await jsontowwServerAPI.get(`/qr-code`);

        const result = { data: response.data, status: response.status }

        return result;
    } catch (error) {
        const reponseError = error as TError;
        console.log('error', error)
        return {
            message: reponseError.response.data.message,
            status: reponseError.response.status
        }
    }
}

export async function checkAuthentication(): Promise<any> {
    try {

        const response = await jsontowwServerAPI.get(`/check-authentication`);

        const result = { data: response.data, status: response.status }


        return result;
    } catch (error) {
        const reponseError = error as TError;
        // console.log('error', error)
        return {
            message: reponseError.response.data.message,
            status: reponseError.response.status
        }
    }
}

export async function authentication({ email, password }: IAuthenticationRequest): Promise<any> {
    try {

        const response = await jsontowwServerAPI.post(`/auth/login`, {
            email,
            password
        });

        const data = { ...response.data, status: response.status };

        return data;
    } catch (error) {
        console.log('error authentication', error)
        return {
            message: "Serviço indisponível",
        } as TError;
        // const reponseError = error as TError;
        // return {v
        //     message: reponseError.response.data.message,
        //     status: reponseError.response.statuss
        // }
    }
}

export async function profileUser(): Promise<any> {
    try {

        const storagedToken = localStorage.getItem(TOKEN_KEY);

        jsontowwServerAPI.defaults.headers.Authorization = `Bearer ${storagedToken}`;

        const response = await jsontowwServerAPI.get(`/users/profile`);

        const data = { data: response.data, status: response.status }

        return data;
    } catch (error) {
        const reponseError = error as TError;
        // console.log('error', error)
        return {
            message: reponseError.response.data.message,
            status: reponseError.response.status
        }
    }
}
