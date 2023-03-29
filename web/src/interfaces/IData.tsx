interface IContact {
    name: string;
    phone: string;
}

export interface IData {
    message: string;
    contacts: IContact[];
}