export interface IUserDto {
  email: string;
  password: string;
}

export interface IRegisterUserDto extends IUserDto {
  firstName: string;
  lastName: string;
  phone: string;
  type: RoleType;
}

export const ROLES = ["Host", "Guest"] as const;
export type RoleType = (typeof ROLES)[number]; // Type derived from array

export function toRoleType(value: string): RoleType {
  if (ROLES.includes(value as RoleType)) {
    return value as RoleType;
  }
  throw new Error(`Invalid role: ${value}. Valid roles are: ${ROLES.join("")}`);
}

// ------------------------------------- For DB Layer -------------------------------------
// TODO 5: can we save the created at and udpated at as Date in DB?
export interface User {
  id: string;
  firstName: string;
  email: string;
  lastName: string;
  phone: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
