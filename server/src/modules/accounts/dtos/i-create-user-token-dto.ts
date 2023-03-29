interface ICreateUserTokenDTO {
    userId: string;
    expiresDate: Date;
    refreshToken: string;
}

export { ICreateUserTokenDTO };
