import { UserBusiness } from "../src/business/UserBusiness";
import { AuthenticatorMock } from "./mocks/servicesMock/AuthenticatorMock";
import { HashManagerMock } from "./mocks/servicesMock/HashManagerMock";
import { IdGeneratorMock } from "./mocks/servicesMock/IdGeneratorMock";
import { UserDatabaseMock } from "./mocks/userMock/UserDatabaseMock";

const userBusinessMock = new UserBusiness(
  new AuthenticatorMock(),
  new HashManagerMock(),
  new IdGeneratorMock(),
  new UserDatabaseMock() as any
);

describe("Signup Test", () => {
  test("Return when name is empty", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.signup(
        "",
        "paulo1@gmail.com",
        "12345678911",
        "paulo123"
      );

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("Enter a name");
    }
  });

  test("Return when email is empty", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.signup(
        "Paulo",
        "",
        "12345678911",
        "paulo123"
      );

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("Enter an email");
    }
  });

  test("Return when email is without @", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.signup(
        "Paulo",
        "paulo1gmail.com",
        "12345678911",
        "paulo123"
      );

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("The email must contain an @");
    }
  });

  test("Return when user already exist", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.signup(
        "Paulo",
        "paulo@gmail.com",
        "12345678911",
        "paulo123"
      );

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("User already exist");
    }
  });

  test("Return when CPF is empty", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.signup(
        "Paulo",
        "paulo1@gmail.com",
        "",
        "paulo123"
      );

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("Enter a CPF");
    }
  });

  test("Return when CPF is less than 11 characters", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.signup(
        "Paulo",
        "paulo1@gmail.com",
        "1234567891",
        "paulo123"
      );

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("The CPF must be equal 11 characters");
    }
  });

  test("Return when cpf is already registered", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.signup(
        "Paulo",
        "paulo1@gmail.com",
        "12345678910",
        "paulo123"
      );

      expect(result).toEqual("mocked_token");
      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("The cpf is already registered");
    }
  });

  test("Return when password is empty", async () => {
    try {
      const result = await userBusinessMock.signup(
        "Paulo",
        "paulo1@gmail.com",
        "12345678911",
        ""
      );

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("Enter a password");
    }
  });

  test("Return when password is less than 6 characters", async () => {
    try {
      const result = await userBusinessMock.signup(
        "Paulo",
        "paulo1@gmail.com",
        "12345678911",
        "paulo"
      );

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual(
        "The password must be longer than 6 characteres"
      );
    }
  });

  test("Return when signup is correct", async () => {
    expect.assertions;
    try {
      const response = await userBusinessMock.signup(
        "Paulo",
        "paulo1@gmail.com",
        "12345678911",
        "paulo1"
      );

      expect(response).toBeTruthy();
    } catch (error: any) {
      throw new Error(error.message);
    }
  });
});

describe("Login Test", () => {
  test("Return when email is empty", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.login("", "paulo123");

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("Enter an email");
    }
  });

  test("Return when password is empty", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.login("paulo@gmail.com", "");

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("Invalid password");
    }
  });

  test("Return when password is less than 6 characters", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.login("paulo@gmail.com", "paulo");

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("Invalid password");
    }
  });

  test("Return when account not exist", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.login(
        "paulo1@gmail.com",
        "paulo123"
      );

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("Account does not exist");
    }
  });

  test("Return when password is incorrect", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.login(
        "paulo@gmail.com",
        "paulo1234"
      );

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("Incorrect password");
    }
  });

  test("Return when user successfully login", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.login(
        "paulo@gmail.com",
        "paulo123"
      );

      expect(result).toBeTruthy();
      expect(result).toEqual("mocked_token");
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error);
    }
  });
});

describe("Get Profile test", () => {
  test("Return when token is missing", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.getProfile("");

      expect(result).toBeFalsy();
    } catch (error: any) {
      expect(error.message).toEqual("Login first");
    }
  });
  test("Return when getProfile is correct", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.getProfile("mocked_token");

      expect(result).toBeTruthy();
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error.message);
    }
  });
});

describe("Edit profile name test", () => {
  test("Return when token is empty", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.editProfileName("", "Parlo");

      expect(result).toBeDefined();
    } catch (error: any) {
      expect(error.message).toEqual("Login first");
    }
  });

  test("Return when name is empty", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.editProfileName("mocked_token", "");

      expect(result).toBeDefined();
    } catch (error: any) {
      expect(error.message).toEqual("Enter a name");
    }
  });

  test("Return when editProfileName is correct", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.editProfileName("mocked_token", "Paulo");

    } catch (error: any) {
      throw new Error(error.message);
    }
  });
});

describe("Delete Profile test", () => {
  test("Return when token is missing", async () => {
    expect.assertions;
    try {
      const result = await userBusinessMock.deleteUser("")

      expect(result).toEqual("")
    } catch (error: any) {
      expect(error.message).toEqual("Login first")
    }
  });

  test("Return when deleteUser is correct", async () => {
    expect.assertions
    try {
      const result = await userBusinessMock.deleteUser("mocked_token")

    } catch(error: any) {
      console.log(error)
      throw new Error(error)
    }
  })
});

