import prismaClient from "../../../../../prisma/prisma-client";
import { IUpdateUserDTO } from "../../dtos/i-update-user-dto";
import { ICreateUserRequestDTO } from "../../use-cases/create-user/i-create-user-request-dto";
import { IUsersRepository } from "../i-users-repository";

class UsersRepository implements IUsersRepository {
    async update({
        id, name, username, email, password, isAdmin
    }: IUpdateUserDTO): Promise<any> {
        const user = await prismaClient.user.update({
            data: {
                name, username, email, password, isAdmin
            },
            where: { id: Number(id) }
        })

        return user
    }

    async create({
        name, username, email, password, isAdmin
    }: ICreateUserRequestDTO): Promise<any> {
        const user = await prismaClient.user.create({
            data: {
                name, username, email, password, isAdmin
            }
        })

        return user
    }

    async findByUsername(username: string): Promise<any> {
        const user = await prismaClient.user.findFirst({
            where: { username: username },
        })

        return user
    }

    async findByEmail(email: string): Promise<any> {
        const user = await prismaClient.user.findFirst({
            where: { email }
        })

        return user
    }

    async findOne(id: string): Promise<any> {
        const user = await prismaClient.user.findFirst({
            where: { id: Number(id) }
        })

        return user
    }
}

export { UsersRepository };
