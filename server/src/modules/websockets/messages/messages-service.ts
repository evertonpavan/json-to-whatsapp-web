import Websocket from "../../../shared/infra/websocket/websocket";

interface ISendQrCode {
    qrCode: string;
    session: string;
}

interface ISendConnectionStatus {
    connectionStatus: boolean;
    session: string;
}

class MessagesService {
    public sendQrCode({ qrCode, session }: ISendQrCode) {

        this._sendQrCode({ qrCode, session });
    }

    private async _sendQrCode({ qrCode, session }: ISendQrCode) {

        const io = Websocket.getInstance();

        io.of('messages').to(session).emit('qrCode', { qrCode });
    }

    public sendConnectionStatus({ connectionStatus, session }: ISendConnectionStatus) {

        this._sendConnectionStatus({ connectionStatus, session });
    }

    private _sendConnectionStatus({ connectionStatus, session }: ISendConnectionStatus) {

        const io = Websocket.getInstance();

        io.of('messages').to(session).emit('connectionStatus', { connectionStatus });
    }
}

export { MessagesService };