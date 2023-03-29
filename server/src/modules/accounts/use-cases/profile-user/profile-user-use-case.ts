import { inject, injectable } from "tsyringe";
import { IUserResponseDTO } from "../../dtos/i-user-response-dto";
import { UserMap } from "../../mapper/user-map";

// import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { IUsersRepository } from "../../repositories/i-users-repository";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findOne(id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
