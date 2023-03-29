export interface IContact {
    name: string;
    phone: string;
}

interface ISendMessagesRequestDTO {
    id: string;
    sessionId: string;
    message: string;
    contacts: IContact[];
}

export { ISendMessagesRequestDTO }