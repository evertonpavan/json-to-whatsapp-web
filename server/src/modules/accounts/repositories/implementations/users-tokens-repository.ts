import prismaClient from "../../../../../prisma/prisma-client";
import { ICreateUserTokenDTO } from "../../dtos/i-create-user-token-dto";
import { IUsersTokensRepository } from "../i-users-tokens-repository";

class UsersTokensRepository implements IUsersTokensRepository {
    async create({ expiresDate, refreshToken, userId, }: ICreateUserTokenDTO): Promise<any> {
        const userToken = await prismaClient.userToken.create({
            data: {
                expiresDate,
                refreshToken,
                userId: Number(userId)
            }
        })

        return userToken
    }

    async findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<any> {
        const userToken = await prismaClient.userToken.findFirst({
            where: {
                userId: Number(userId),
                refreshToken: refreshToken
            }
        })

        return userToken
    }

    async deleteById(id: string): Promise<any> {
        const userToken = await prismaClient.userToken.delete({
            where: { id: Number(id) }
        })

        return userToken
    }

    async findByRefreshToken(refreshToken: string): Promise<any> {
        const userToken = await prismaClient.userToken.findFirst({
            where: { refreshToken: refreshToken }
        })

        return userToken
    }

}

export { UsersTokensRepository };
