import {
  IRegisterUserDto as IRegisterUserDto,
  toRoleType,
} from "../models/users.models";
import { UserRespository } from "../repositories/user.repository";

export class AuthService {
  private userRepository: UserRespository;

  constructor() {
    this.userRepository = new UserRespository();
  }

  public registerUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    type: string
  ) => {
    const user: IRegisterUserDto = {
      firstName,
      lastName,
      email,
      password,
      phone,
      type: toRoleType(type),
    };

    const newUser = await this.userRepository.createUser(user);
    return newUser;
  };
}
