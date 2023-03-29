interface ICreateUserRequestDTO {
    name: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export { ICreateUserRequestDTO }