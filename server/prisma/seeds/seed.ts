import prismaClient from "../prisma-client";
import { users } from './seeds-data';

const load = async () => {
    try {
        await prismaClient.user.deleteMany()
        console.log('Deleted records in user table')

        await prismaClient.user.createMany({
            data: users
        })
        console.log('Added users data')

    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prismaClient.$disconnect()
    }
}

load()