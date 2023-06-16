import { User } from "../../../src/models/User";
import { userMock } from "./UserMock";

export class UserDatabaseMock {
  public signup = async (user: User): Promise<void> => {};

  public getUserByEmail = async (email: string) => {
    if (email === "paulo@gmail.com") {
      return userMock;
    } else {
      undefined;
    }
  };

  public getUserByCpf = async (cpf: string) => {
    if (cpf === "12345678910") {
      return userMock;
    } else {
      return undefined;
    }
  };

  public getUserById = async (id: string) => {
    if (id === "mocked_id") {
      return userMock;
    } else {
      return undefined;
    }
  };

  public getProfile = async (id: string) => {
    if (id === "mocked_id") {
      return userMock;
    } else {
      return undefined;
    }
  };

  public editProfileName = async (token: string, name: string) => {
    if (token === "mocked_token") {
      return `Name changed to ${name}`;
    } else {
      return undefined;
    }
  };

  public deleteUser = async (token: string) => {};
}
