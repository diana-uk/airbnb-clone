export interface JwtUser {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  Phone: string;
  Type: string;
  CreatedAt: string;
  UpdatedAt: string;
  iat: number;
  exp: number;
}

//  Example of JWT Token Payload:

//  jwtTokenVerify:  {
//   Id: '9bb918ed-6be3-48a0-b2e4-9184be21bc47',
//   FirstName: 'Rsdd',
//   LastName: 'Doe',
//   Email: 'john.doe@examxple.com',
//   Password: 'HelloWorld@9',
//   Phone: '+1-555-0123',
//   Type: 'Host',
//   CreatedAt: '2025-09-26T15:53:23.000Z',
//   UpdatedAt: '2025-09-26T15:53:23.000Z',
//   iat: 1760443277,
//   exp: 1760446877
// }
