import { Socket } from "socket.io";
import MySocketInterface from "./mySocketInterface";

interface ISocket extends Socket {
    userId?: string;
}

class MessagesSocket implements MySocketInterface {

    async handleConnection(socket: ISocket) {

    }

    async middlewareImplementation(socket: ISocket, next: () => any) {

        return next();
    }
}

export default MessagesSocket;