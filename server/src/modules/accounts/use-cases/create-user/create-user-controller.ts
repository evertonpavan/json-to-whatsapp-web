import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./create-user-use-case";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { name, username, password, email, isAdmin } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({ name, username, password, email, isAdmin });

        return response.status(200).send();
    }
}

export { CreateUserController };
