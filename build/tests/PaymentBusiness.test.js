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
const PaymentBusiness_1 = require("../src/business/PaymentBusiness");
const IdGenerator_1 = require("../src/services/IdGenerator");
const PaymenteDatabaseMock_1 = require("./mocks/paymentMock/PaymenteDatabaseMock");
const AuthenticatorMock_1 = require("./mocks/servicesMock/AuthenticatorMock");
const UserMock_1 = require("./mocks/userMock/UserMock");
const paymentBusinessMock = new PaymentBusiness_1.PaymentBusiness(new AuthenticatorMock_1.AuthenticatorMock(), new IdGenerator_1.IdGenerator(), new PaymenteDatabaseMock_1.PaymenteDatabaseMock());
describe("Credit Payment test", () => {
    test("Return when authorization is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield paymentBusinessMock.creditPayment("1234567891012345", "123", "MasterCard", "", "mocked_productId", "2030/10/01");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Login first");
        }
    }));
    test("Return when card number is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield paymentBusinessMock.creditPayment("", "123", "MasterCard", "mocked_token", "mocked_productId", "2030/10/01");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a card number");
        }
    }));
    test("Return when card cvv is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield paymentBusinessMock.creditPayment("1234567891012345", "", "MasterCard", "mocked_token", "mocked_productId", "2030/10/01");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a CVV");
        }
    }));
    test("Return when card name is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield paymentBusinessMock.creditPayment("1234567891012345", "123", "", "mocked_token", "mocked_productId", "2030/10/01");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a card name");
        }
    }));
    test("Return when validation date is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield paymentBusinessMock.creditPayment("1234567891012345", "123", "CardName", "mocked_token", "mocked_productId", "");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a card validation date");
        }
    }));
    test("Return when validation date is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield paymentBusinessMock.creditPayment("1234567891012345", "123", "CardName", "mocked_token", "mocked_productId", "2020/09/06");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Invalid date");
        }
    }));
    test("Return when creditPayment is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield paymentBusinessMock.creditPayment("1234567891012345", "123", "CardName", "mocked_token", "mocked_productId", "2030/09/06");
            expect(result).toBeUndefined();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }));
});
describe("Boleto Payment test", () => {
    test("Return when authorization is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield paymentBusinessMock.boletoPayment("", "mocked_productId");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Login first");
        }
    }));
    test("Return when boleto payment is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield paymentBusinessMock.boletoPayment("mocked_token", "mocked_productId");
            expect(result).toBeUndefined();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }));
});
describe("Get Card test", () => {
    test("Return when authorization is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield paymentBusinessMock.getCardPayment("");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Login first");
        }
    }));
    test("Return when getCard is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const token = "mocked_id";
            const result = yield paymentBusinessMock.getCardPayment(token);
            expect(token).toEqual(UserMock_1.userMock.getId());
            expect(result).toBeTruthy();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }));
});
describe("Get boleto test", () => {
    test("Return when authorization is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield paymentBusinessMock.getBoletoPayment("");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Login first");
        }
    }));
    test("Return when getCard is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const token = "mocked_id";
            const result = yield paymentBusinessMock.getBoletoPayment(token);
            expect(token).toEqual(UserMock_1.userMock.getId());
            expect(result).toBeTruthy();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }));
});
//# sourceMappingURL=PaymentBusiness.test.js.map