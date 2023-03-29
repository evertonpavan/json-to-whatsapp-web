import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/i-users-repository";
import { IUsersTokensRepository } from "../../repositories/i-users-tokens-repository";
import { verify } from "jsonwebtoken";
import auth from "../../../../config/auth";

interface IPayload {
    sub: string;
    email: string;
}

interface IRequest {
    id: string;
    password: string;
}

@injectable()
class ChangePasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute({ id, password }: IRequest): Promise<void> {

        const user = await this.usersRepository.findOne(id);

        user.password = await hash(password, 8);

        await this.usersRepository.update(user);
    }
}

export { ChangePasswordUserUseCase };
