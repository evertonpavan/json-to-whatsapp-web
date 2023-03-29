import { ICreateUserTokenDTO } from "../dtos/i-create-user-token-dto";

interface IUsersTokensRepository {
    create({
        expiresDate,
        refreshToken,
        userId,
    }: ICreateUserTokenDTO): Promise<any>;
    findByUserIdAndRefreshToken(
        userId: string,
        refreshToken: string
    ): Promise<any>;
    deleteById(id: string): Promise<any>;
    findByRefreshToken(refreshToken: string): Promise<any>;
}

export { IUsersTokensRepository };
