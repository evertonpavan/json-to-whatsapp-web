import { container } from "tsyringe";

import "./providers";

import { IUsersRepository } from "../../modules/accounts/repositories/i-users-repository";
import { UsersRepository } from "../../modules/accounts/repositories/implementations/users-repository";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/i-users-tokens-repository";
import { UsersTokensRepository } from "../../modules/accounts/repositories/implementations/users-tokens-repository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);