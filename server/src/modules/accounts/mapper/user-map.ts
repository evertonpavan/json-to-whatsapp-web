import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/i-user-response-dto";


class UserMap {
    static toDTO({
        id,
        name,
        username,
        email,
        isAdmin,
    }: IUserResponseDTO): IUserResponseDTO {
        const user = instanceToInstance({
            id,
            name,
            username,
            email,
            isAdmin,
        })

        return user;
    }
}

export { UserMap };
