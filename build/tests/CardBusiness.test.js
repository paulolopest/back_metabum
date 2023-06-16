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
const CardBusiness_1 = require("../src/business/CardBusiness");
const Date_1 = require("../src/services/Date");
const CardDatabase_1 = require("./mocks/cardMock/CardDatabase");
const AuthenticatorMock_1 = require("./mocks/servicesMock/AuthenticatorMock");
const HashManagerMock_1 = require("./mocks/servicesMock/HashManagerMock");
const IdGeneratorMock_1 = require("./mocks/servicesMock/IdGeneratorMock");
const cardBusinessMock = new CardBusiness_1.CardBusiness(new AuthenticatorMock_1.AuthenticatorMock(), new HashManagerMock_1.HashManagerMock(), new IdGeneratorMock_1.IdGeneratorMock(), new CardDatabase_1.CardDatabaseMock());
describe("Create Card test", () => {
    test("Return when name is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield cardBusinessMock.createCard("", "1234567891012131", "123", "2030/30/01", "mocked_id");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a name");
        }
    }));
    test("Return when number is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield cardBusinessMock.createCard("MasterCard", "", "123", "2030/30/01", "mocked_id");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a card number");
        }
    }));
    test("Return when cvv is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield cardBusinessMock.createCard("MasterCard", "1234567891012131", "", "2030/30/01", "mocked_id");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a cvv");
        }
    }));
    test("Return when Date is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield cardBusinessMock.createCard("MasterCard", "1234567891012131", "123", "", "mocked_id");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a validation date");
        }
    }));
    test("Return when Date is validy", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield (0, Date_1.verifyDate)("2030/12/31");
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a validation date");
        }
    }));
    test("Return when authorization is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield cardBusinessMock.createCard("MasterCard", "1234567891012131", "123", "2030/30/01", "");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Login first");
        }
    }));
    test("Return when card is already registered", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield cardBusinessMock.createCard("MasterCard", "1234567891098765", "123", "2030/30/01", "mocked_id");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Card already registered");
        }
    }));
    test("Return when cardRegister is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield cardBusinessMock.createCard("MasterCard", "1234557891098765", "123", "2030/30/01", "mocked_id");
            expect(result).toBeUndefined();
        }
        catch (error) {
            expect(error.message).toEqual("Card already registered");
        }
    }));
});
describe("Get All Cards test", () => {
    test("Return when authorization is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield cardBusinessMock.getAllCards("");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Login first");
        }
    }));
    test("Return when getAllCards is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield cardBusinessMock.getAllCards("mocked_userId");
            expect(result).toBeTruthy();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }));
});
describe("Delete card test", () => {
    test("Return when authorization is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield cardBusinessMock.deleteCard("", "mocked_id");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Login first");
        }
    }));
    test("Return when deleteCard is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield cardBusinessMock.deleteCard("mocked_token", "mocked_id");
            expect(result).toBeUndefined();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }));
});
//# sourceMappingURL=CardBusiness.test.js.map