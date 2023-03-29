import { Request, Response } from "express";
import { container } from "tsyringe";

import { ChangePasswordUserUseCase } from "./change-password-user-use-case";

class ChangePasswordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password } = request.body;

        const { id } = request.user

        const changePasswordUserUseCase = container.resolve(
            ChangePasswordUserUseCase
        );

        await changePasswordUserUseCase.execute({ id: String(id),  password });

        return response.send();
    }
}

export { ChangePasswordUserController };
