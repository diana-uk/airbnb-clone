import { UserRespository } from "../repositories/user.repository";
import { CustomRequest } from "../types/request.types";

export class UserService {
  private userRepository: UserRespository;

  constructor() {
    this.userRepository = new UserRespository();
  }

  public async findByEmail(email: string): Promise<boolean> {
    const retrievedUser = await this.userRepository.getUserByEmail(email);
    console.log(retrievedUser);
    return !!retrievedUser;
  }
}
