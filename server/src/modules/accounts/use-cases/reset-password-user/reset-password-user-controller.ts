import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUserUseCase } from "./reset-password-user-use-case";

class ResetPasswordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        const resetPasswordUserUsecase = container.resolve(
            ResetPasswordUserUseCase
        );

        await resetPasswordUserUsecase.execute({ token: String(token), password });

        return response.send();
    }
}

export { ResetPasswordUserController };
