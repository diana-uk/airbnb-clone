import { IRegisterUserDto, toRoleType, User } from "../models/users.models";
import { UserRespository } from "../repositories/user.repository";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/jwt.util";

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

    const token = generateToken(newUser);
    return { newUser, token };
  };

  public login = async (email: string, password: string) => {
    // 1. Check if email exists in DB
    const userFromDB: User | null = await this.userRepository.getUserByEmail(
      email
    );

    if (!userFromDB) {
      throw new AppError("Email or password are not correct !", 401, {
        email,
        password,
      });
    }

    // 2. Check if password is correct

    const isPasswordCorrect = this.verifyPassword(
      password,
      userFromDB.Password
    );
    console.log("isValidPassword", isPasswordCorrect);

    if (!isPasswordCorrect) {
      throw new AppError("Email or password are not correct !", 401, {
        email,
        password,
      });
    }

    const user: IRegisterUserDto = {
      firstName: userFromDB.FirstName,
      lastName: userFromDB.LastName,
      email: userFromDB.Email,
      password: userFromDB.Password,
      phone: userFromDB.Phone,
      type: toRoleType(userFromDB.Type),
    };

    // 3. Generate token
    const token = generateToken(userFromDB);
    // 4. Return user with the token
    return { token, user };
  };

  private verifyPassword = (password: string, realPassword: string) => {
    console.log("password: ", password, "real password: ", realPassword);
    return password === realPassword;
  };
}
