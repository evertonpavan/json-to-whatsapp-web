import { Server, Socket } from 'socket.io';
import http from 'http';

const WEBSOCKET_CORS = {
    origin: "*",
    methods: ["GET", "POST"]
}

class Websocket extends Server {

    private static io: Websocket;

    constructor(httpServer: any) {
        super(httpServer, {
            cors: WEBSOCKET_CORS,
            transports: ['polling', 'websocket'],
        });
    }

    public static getInstance(httpServer?: http.Server): Websocket {

        if (!Websocket.io) {
            Websocket.io = new Websocket(httpServer);
        }

        return Websocket.io;
    }

    public initializeHandlers(socketHandlers: Array<any>) {

        socketHandlers.forEach(element => {
            let namespace = Websocket.io.of(element.path, (socket: Socket) => {
                element.handler.handleConnection(socket);
            });

            if (element.handler.middlewareImplementation) {
                namespace.use(element.handler.middlewareImplementation);
            }
        });
    }
}

export default Websocket;