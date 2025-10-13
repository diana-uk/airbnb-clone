import { App } from "../App";
import { IRegisterUserDto, User } from "../models/users.models";
import { v4 as uuidv4 } from "uuid";

// export const mockUsers: User[] = [
//   {
//     id: "uuid-1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6",
//     firstName: "John",
//     lastName: "Doe",
//     email: "john.doe@email.com",
//     password: "$2b$10$K8Z9mVQx2.hashed.password.here",
//     phone: "+1-555-0101",
//     type: "Host",
//     createdAt: new Date("2024-01-15T10:30:00Z"),
//     updatedAt: new Date("2024-01-15T10:30:00Z"),
//   },
//   {
//     id: "uuid-2b3c4d5e-6f7g-8h9i-0j1k-l2m3n4o5p6q7",
//     firstName: "Sarah",
//     lastName: "Johnson",
//     email: "sarah.johnson@email.com",
//     password: "$2b$10$L9A0nWRy3.hashed.password.here",
//     phone: "+1-555-0202",
//     type: "Guest",
//     createdAt: new Date("2024-02-20T14:45:00Z"),
//     updatedAt: new Date("2024-02-22T09:15:00Z"),
//   },
//   {
//     id: "uuid-3c4d5e6f-7g8h-9i0j-1k2l-m3n4o5p6q7r8",
//     firstName: "Michael",
//     lastName: "Chen",
//     email: "michael.chen@email.com",
//     password: "$2b$10$M0B1oXSz4.hashed.password.here",
//     phone: "+1-555-0303",
//     type: "Host",
//     createdAt: new Date("2024-03-10T08:20:00Z"),
//     updatedAt: new Date("2024-03-10T08:20:00Z"),
//   },
//   {
//     id: "uuid-4d5e6f7g-8h9i-0j1k-2l3m-n4o5p6q7r8s9",
//     firstName: "Emily",
//     lastName: "Rodriguez",
//     email: "emily.rodriguez@email.com",
//     password: "$2b$10$N1C2pYTa5.hashed.password.here",
//     phone: "+1-555-0404",
//     type: "Guest",
//     createdAt: new Date("2024-01-25T16:10:00Z"),
//     updatedAt: new Date("2024-03-01T11:30:00Z"),
//   },
//   {
//     id: "uuid-5e6f7g8h-9i0j-1k2l-3m4n-o5p6q7r8s9t0",
//     firstName: "David",
//     lastName: "Thompson",
//     email: "david.thompson@email.com",
//     password: "$2b$10$O2D3qZUb6.hashed.password.here",
//     phone: "+1-555-0505",
//     type: "Host",
//     createdAt: new Date("2024-02-14T12:00:00Z"),
//     updatedAt: new Date("2024-02-14T12:00:00Z"),
//   },
//   {
//     id: "uuid-6f7g8h9i-0j1k-2l3m-4n5o-p6q7r8s9t0u1",
//     firstName: "Lisa",
//     lastName: "Anderson",
//     email: "lisa.anderson@email.com",
//     password: "$2b$10$P3E4rAVc7.hashed.password.here",
//     phone: "+1-555-0606",
//     type: "Guest",
//     createdAt: new Date("2024-03-05T09:45:00Z"),
//     updatedAt: new Date("2024-03-05T09:45:00Z"),
//   },
//   {
//     id: "uuid-7g8h9i0j-1k2l-3m4n-5o6p-q7r8s9t0u1v2",
//     firstName: "James",
//     lastName: "Wilson",
//     email: "james.wilson@email.com",
//     password: "$2b$10$Q4F5sBWd8.hashed.password.here",
//     phone: "+1-555-0707",
//     type: "Host",
//     createdAt: new Date("2024-01-30T15:20:00Z"),
//     updatedAt: new Date("2024-02-15T10:45:00Z"),
//   },
//   {
//     id: "uuid-8h9i0j1k-2l3m-4n5o-6p7q-r8s9t0u1v2w3",
//     firstName: "Anna",
//     lastName: "Garcia",
//     email: "anna.garcia@email.com",
//     password: "$2b$10$R5G6tCXe9.hashed.password.here",
//     phone: "+1-555-0808",
//     type: "Guest",
//     createdAt: new Date("2024-02-28T11:15:00Z"),
//     updatedAt: new Date("2024-02-28T11:15:00Z"),
//   },
//   {
//     id: "uuid-9i0j1k2l-3m4n-5o6p-7q8r-s9t0u1v2w3x4",
//     firstName: "Robert",
//     lastName: "Lee",
//     email: "robert.lee@email.com",
//     password: "$2b$10$S6H7uDYf0.hashed.password.here",
//     phone: "+1-555-0909",
//     type: "Host",
//     createdAt: new Date("2024-03-12T13:30:00Z"),
//     updatedAt: new Date("2024-03-12T13:30:00Z"),
//   },
//   {
//     id: "uuid-0j1k2l3m-4n5o-6p7q-8r9s-t0u1v2w3x4y5",
//     firstName: "Maria",
//     lastName: "Martinez",
//     email: "maria.martinez@email.com",
//     password: "$2b$10$T7I8vEZg1.hashed.password.here",
//     phone: "+1-555-1010",
//     type: "Guest",
//     createdAt: new Date("2024-01-18T07:50:00Z"),
//     updatedAt: new Date("2024-03-08T14:20:00Z"),
//   },
// ];

export class UserRespository {
  private dbConnectionInstance;
  constructor() {
    this.dbConnectionInstance = App.getDBInstance();
  }

  public createUser = async (userData: IRegisterUserDto) => {
    const connection = await this.dbConnectionInstance;

    try {
      const userId = uuidv4();
      const now = new Date();
      const response = await connection.execute(
        `INSERT INTO USERS (Id, FirstName, LastName,Email, Password, Phone, Type, CreatedAt, UpdatedAt) 
        VALUES  (?,?,?,?,?,?,?,?,?)`,
        [
          userId,
          userData.firstName,
          userData.lastName,
          userData.email,
          userData.password,
          userData.phone,
          userData.type,
          now,
          now,
        ]
      );
      console.log(response);
      const [rows] = (await connection.execute(
        "SELECT * FROM USERS WHERE Id = ?",
        [userId]
      )) as any[];

      const users = rows as User[];

      return users[0] || null;
    } catch (error) {
      throw error;
    }
  };

  public getUserByEmail = async (email: string) => {
    const connection = await this.dbConnectionInstance;

    try {
      const [rows] = (await connection.execute(
        "SELECT * FROM USERS WHERE Email = ?",
        [email]
      )) as any[];

      console.log(rows);
      if (rows.length === 0) {
        return null;
      }
      const users = rows as User[];

      return users[0];
    } catch (error) {
      throw error;
    }
  };
}
