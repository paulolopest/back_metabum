"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserBusiness_1 = require("../src/business/UserBusiness");
const AuthenticatorMock_1 = require("./mocks/servicesMock/AuthenticatorMock");
const HashManagerMock_1 = require("./mocks/servicesMock/HashManagerMock");
const IdGeneratorMock_1 = require("./mocks/servicesMock/IdGeneratorMock");
const UserDatabaseMock_1 = require("./mocks/userMock/UserDatabaseMock");
const userBusinessMock = new UserBusiness_1.UserBusiness(new AuthenticatorMock_1.AuthenticatorMock(), new HashManagerMock_1.HashManagerMock(), new IdGeneratorMock_1.IdGeneratorMock(), new UserDatabaseMock_1.UserDatabaseMock());
describe("Signup Test", () => {
    test("Return when name is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.signup("", "paulo1@gmail.com", "12345678911", "paulo123");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a name");
        }
    }));
    test("Return when email is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.signup("Paulo", "", "12345678911", "paulo123");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("Enter an email");
        }
    }));
    test("Return when email is without @", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.signup("Paulo", "paulo1gmail.com", "12345678911", "paulo123");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("The email must contain an @");
        }
    }));
    test("Return when user already exist", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.signup("Paulo", "paulo@gmail.com", "12345678911", "paulo123");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("User already exist");
        }
    }));
    test("Return when CPF is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.signup("Paulo", "paulo1@gmail.com", "", "paulo123");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a CPF");
        }
    }));
    test("Return when CPF is less than 11 characters", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.signup("Paulo", "paulo1@gmail.com", "1234567891", "paulo123");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("The CPF must be equal 11 characters");
        }
    }));
    test("Return when cpf is already registered", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.signup("Paulo", "paulo1@gmail.com", "12345678910", "paulo123");
            expect(result).toEqual("mocked_token");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("The cpf is already registered");
        }
    }));
    test("Return when password is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield userBusinessMock.signup("Paulo", "paulo1@gmail.com", "12345678911", "");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a password");
        }
    }));
    test("Return when password is less than 6 characters", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield userBusinessMock.signup("Paulo", "paulo1@gmail.com", "12345678911", "paulo");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("The password must be longer than 6 characteres");
        }
    }));
    test("Return when signup is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const response = yield userBusinessMock.signup("Paulo", "paulo1@gmail.com", "12345678911", "paulo1");
            expect(response).toBeTruthy();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }));
});
describe("Login Test", () => {
    test("Return when email is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.login("", "paulo123");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("Enter an email");
        }
    }));
    test("Return when password is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.login("paulo@gmail.com", "");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("Invalid password");
        }
    }));
    test("Return when password is less than 6 characters", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.login("paulo@gmail.com", "paulo");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("Invalid password");
        }
    }));
    test("Return when account not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.login("paulo1@gmail.com", "paulo123");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("Account does not exist");
        }
    }));
    test("Return when password is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.login("paulo@gmail.com", "paulo1234");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("Incorrect password");
        }
    }));
    test("Return when user successfully login", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.login("paulo@gmail.com", "paulo123");
            expect(result).toBeTruthy();
            expect(result).toEqual("mocked_token");
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error);
        }
    }));
});
describe("Get Profile test", () => {
    test("Return when token is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.getProfile("");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("Login first");
        }
    }));
    test("Return when getProfile is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.getProfile("mocked_token");
            expect(result).toBeTruthy();
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }));
});
describe("Edit profile name test", () => {
    test("Return when token is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.editProfileName("", "Parlo");
            expect(result).toBeDefined();
        }
        catch (error) {
            expect(error.message).toEqual("Login first");
        }
    }));
    test("Return when name is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.editProfileName("mocked_token", "");
            expect(result).toBeDefined();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a name");
        }
    }));
    test("Return when editProfileName is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.editProfileName("mocked_token", "Paulo");
        }
        catch (error) {
            throw new Error(error.message);
        }
    }));
});
describe("Delete Profile test", () => {
    test("Return when token is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.deleteUser("");
            expect(result).toEqual("");
        }
        catch (error) {
            expect(error.message).toEqual("Login first");
        }
    }));
    test("Return when deleteUser is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.deleteUser("mocked_token");
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }));
});
//# sourceMappingURL=UserBussines.test.js.map