export const AUTH_SCHEMA = "Bearer ";

export const INTERNAL_SERVER_ERROR = "Internal Server Error";

export const INCORRECT_EMAIL_AND_PASSWORD =
  "Email or password are not correct !";

// TODO [BNB-12]: Insert all the strings to somewhere more structured to server message mappings
export const FAILED_TO_CREATE_PROPERTY = "Failed to create property !";

export const FAILED_TO_UPDATE_PROPERTY = "Failed to update property !";

export const FAILED_TO_CREATE_RESERVATION = "Failed to create reservation !";

export const UNAUTHORIZED = "Unauthorized";

export const FORBIDDEN = "Forbidden";

export enum APP_RESPONSE_CODE {
  SUCCESS = 200,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  BAD_RESPONSE = 400
}
