import {
  APP_RESPONSE_CODE,
  INCORRECT_EMAIL_AND_PASSWORD,
  UNAUTHORIZED,
} from "../config/constants";
import { mapJwtToCurrentUserDto } from "../mappers/auth.mappers";
import { IRegisterUserDto, toRoleType, User } from "../models/users.models";
import { UserRespository } from "../repositories/user.repository";
import { JwtUser } from "../types/auth.types";
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

    // TODO: NULL CHECK
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
      throw new AppError({
        errorMessage: INCORRECT_EMAIL_AND_PASSWORD,
        statusCode: APP_RESPONSE_CODE.UNAUTHORIZED,
        data: {
          email,
          password,
        },
      });
    }

    // 2. Check if password is correct

    const isPasswordCorrect = this.verifyPassword(
      password,
      userFromDB.Password
    );
    console.log("isValidPassword", isPasswordCorrect);

    if (!isPasswordCorrect) {
      throw new AppError({
        errorMessage: INCORRECT_EMAIL_AND_PASSWORD,
        statusCode: APP_RESPONSE_CODE.UNAUTHORIZED,
        data: {
          email,
          password,
        },
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

  public getUser = (jwtUser: JwtUser) => {
    if (!jwtUser) {
      throw new AppError({
        errorMessage: UNAUTHORIZED,
        statusCode: APP_RESPONSE_CODE.UNAUTHORIZED,
      });
    }
    const currentUser = mapJwtToCurrentUserDto(jwtUser);
    return currentUser;
  };

  private verifyPassword = (password: string, realPassword: string) => {
    console.log("password: ", password, "real password: ", realPassword);
    return password === realPassword;
  };
}
