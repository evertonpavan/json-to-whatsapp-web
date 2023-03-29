import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/i-users-repository";
import { ICreateUserRequestDTO } from "./i-create-user-request-dto";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
    ) { }

    async execute({ name, username, password, email, isAdmin }: ICreateUserRequestDTO): Promise<any> {
       
        // const user = await this.usersRepository.findByUsername(email)


        // if (user) {
        //     throw new AppError("User already exists", 400);
        // }

        const user = await this.usersRepository.findByEmail(email)

        if (user) {
            throw new AppError("User already exists", 400);
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({ name, username, password: passwordHash, email, isAdmin })

        return
    }
}

export { CreateUserUseCase };
