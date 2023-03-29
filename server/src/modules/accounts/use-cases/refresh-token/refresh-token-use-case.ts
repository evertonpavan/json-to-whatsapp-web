import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/i-users-tokens-repository";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}
@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute(token: string): Promise<ITokenResponse> {
        const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;
        const userId = sub;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
            userId,
            token
        );

        if (!userToken) {
            throw new AppError("Refresh Token does not exists!");
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expires_date = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );

        await this.usersTokensRepository.create({
            userId: sub,
            refreshToken: refresh_token,
            expiresDate: expires_date,
        });

        const newToken = sign({}, auth.secret_token, {
            subject: userId,
            expiresIn: auth.expires_in_token,
        });

        return { refresh_token, token: newToken };
    }
}

export { RefreshTokenUseCase };
