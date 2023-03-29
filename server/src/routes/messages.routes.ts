import { Router } from "express";
import { SendMessagesController } from "../modules/messages/use-cases/send-messages/send-messages-controller";

const messagesRoutes = Router();

const sendMessagesController = new SendMessagesController();

messagesRoutes.post("/send-messages", sendMessagesController.handle);


export { messagesRoutes };