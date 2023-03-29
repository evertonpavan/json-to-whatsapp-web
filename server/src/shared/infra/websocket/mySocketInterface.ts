import { Socket } from "socket.io";

interface MySocketInterface {

    handleConnection(socket: Socket): void;
    middlewareImplementation?(soccket: Socket, next: any): void

}

export default MySocketInterface;