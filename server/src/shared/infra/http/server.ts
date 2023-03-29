import {
    server
} from "./app";

const APP_PORT = process.env.APP_PORT || 8302;

server.listen(APP_PORT, () => console.log(`Server is running on port ${APP_PORT}!`));

