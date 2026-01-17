import { JwtUser } from "../types/auth.types";

export function mapJwtToCurrentUserDto(jwtUser: JwtUser) {
  return {
    id: jwtUser.Id,
    firstName: jwtUser.FirstName,
    lastName: jwtUser.LastName,
    email: jwtUser.Email,
    phone: jwtUser.Phone,
    type: jwtUser.Type,
  };
}
