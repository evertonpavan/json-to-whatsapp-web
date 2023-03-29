import { IUpdateUserDTO } from "../dtos/i-update-user-dto";
import { ICreateUserRequestDTO } from "../use-cases/create-user/i-create-user-request-dto";

interface IUsersRepository {
    create(data: ICreateUserRequestDTO): Promise<any>;
    findByUsername(username: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findOne(id: string): Promise<any>;
    update(data: IUpdateUserDTO): Promise<any>;
}

export { IUsersRepository };
