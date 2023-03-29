import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/i-users-repository";
import { IUsersTokensRepository } from "../../repositories/i-users-tokens-repository";

interface IRequest {
    email: string;
    password: string;
    username: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
        username: string;
        isAdmin: boolean;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ email, password, username }: IRequest): Promise<IResponse> {

        const {
            expires_in_token,
            secret_token,
            secret_refresh_token,
            expires_in_refresh_token,
            expires_refresh_token_days,
        } = auth;

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect!");
        }

        // user = await this.usersRepository.findByUsername(username);

        // if (!user) {
        //     throw new AppError("Email or password incorrect!");
        // }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, secret_token, {
            subject: String(user.id),
            expiresIn: expires_in_token,
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: String(user.id),
            expiresIn: expires_in_refresh_token,
        });

        const refresh_token_expires_date = this.dateProvider.addDays(
            expires_refresh_token_days
        );

        await this.usersTokensRepository.create({
            userId: user.id,
            refreshToken: refresh_token,
            expiresDate: refresh_token_expires_date,
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
                username: user.username,
                isAdmin: user.isAdmin,
            },
            refresh_token,
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
