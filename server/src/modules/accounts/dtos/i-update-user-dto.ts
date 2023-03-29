interface IUpdateUserDTO {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export { IUpdateUserDTO };
