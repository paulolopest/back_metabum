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
const ProductBusiness_1 = require("../src/business/ProductBusiness");
const ProductDatabaseMock_1 = require("./mocks/productMock/ProductDatabaseMock");
const AuthenticatorMock_1 = require("./mocks/servicesMock/AuthenticatorMock");
const IdGeneratorMock_1 = require("./mocks/servicesMock/IdGeneratorMock");
const UserDatabaseMock_1 = require("./mocks/userMock/UserDatabaseMock");
const UserMock_1 = require("./mocks/userMock/UserMock");
const productBusinessMock = new ProductBusiness_1.ProductBusiness(new AuthenticatorMock_1.AuthenticatorMock(), new IdGeneratorMock_1.IdGeneratorMock(), new ProductDatabaseMock_1.ProductDatabaseMock(), new UserDatabaseMock_1.UserDatabaseMock());
describe("Insert Product test", () => {
    test("Return when authorization is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield productBusinessMock.insertProduct("ps5", "https://www.ps5.com", 5000, "ps5", "videogame da sony", "");
            expect(result).toBeDefined();
        }
        catch (error) {
            expect(error.message).toEqual("Login First");
        }
    }));
    test("Return when name is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield productBusinessMock.insertProduct("", "https://www.ps5.com", 5000, "ps5", "videogame da sony", "mocked_token");
            expect(result).toBeDefined();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a name");
        }
    }));
    test("Return when productImg is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield productBusinessMock.insertProduct("ps5", "", 5000, "ps5", "videogame da sony", "mocked_token");
            expect(result).toBeDefined();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a link for productImg");
        }
    }));
    test("Return when productImg link is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield productBusinessMock.insertProduct("ps5", "123123123", 5000, "ps5", "videogame da sony", "mocked_token");
            expect(result).toBeDefined();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a valid link");
        }
    }));
    test("Return when price is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield productBusinessMock.insertProduct("ps5", "https://www.ps5.com", "", "ps5", "videogame da sony", "mocked_token");
            expect(result).toBeDefined();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a price");
        }
    }));
    test("Return when price is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield productBusinessMock.insertProduct("ps5", "https://www.ps5.com", -5000, "ps5", "videogame da sony", "mocked_token");
            expect(result).toBeDefined();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a valid price");
        }
    }));
    test("Return when tags is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield productBusinessMock.insertProduct("ps5", "https://www.ps5.com", 5000, "", "videogame da sony", "mocked_token");
            expect(result).toBeDefined();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a tags");
        }
    }));
    test("Return when description is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield productBusinessMock.insertProduct("ps5", "https://www.ps5.com", 5000, "sony", "", "mocked_token");
            expect(result).toBeDefined();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a description");
        }
    }));
    test("Return when user is not a admin", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const token = "mocked_toki";
            const result = yield productBusinessMock.insertProduct("ps5", "https://www.ps5.com", 5000, "sony", "videogame", token);
            const verify = UserMock_1.userMock2.getRole();
            if (verify != "Administrator") {
                throw new Error("Just admin can insert products");
            }
            expect(result).toBeDefined();
        }
        catch (error) {
            expect(error.message).toEqual("Just admin can insert products");
        }
    }));
    test("Return when insertProduct is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const token = "mocked_id";
            const result = yield productBusinessMock.insertProduct("ps5", "https://www.ps5.com", 5000, "sony", "videogame", token);
            const verify = UserMock_1.userMock.getId();
            if (token != verify) {
                throw new Error("Just admin can insert products");
            }
            expect(result).toBeUndefined();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }));
});
describe("Get Products test", () => {
    test("Return when getProduct is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield productBusinessMock.getProducts("");
            expect(result).toBeDefined();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }));
});
describe("Edit Product Price test", () => {
    test("Return when authorization is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield productBusinessMock.editPrice("", 5000, "mocked_productId");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Login first");
        }
    }));
    test("Return when price is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield productBusinessMock.editPrice("mocked_token", "", "mocked_productId");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a price");
        }
    }));
    test("Return when user is not an admin", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const token = "mocked_aidi";
            const result = yield productBusinessMock.editPrice(token, 5000, "mocked_productId");
            const admin = UserMock_1.userMock.getId();
            if (token != admin) {
                throw new Error("Just administrator can edit the price");
            }
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Just administrator can edit the price");
        }
    }));
    test("Return when editPrice is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const token = "mocked_id";
            const result = yield productBusinessMock.editPrice(token, 5000, "mocked_productId");
            const admin = UserMock_1.userMock.getId();
            if (token != admin) {
                throw new Error("Just administrator can edit the price");
            }
            expect(result).toBeUndefined();
        }
        catch (error) {
            expect(error.message).toEqual("Just administrator can edit the price");
        }
    }));
});
describe("Delete Product test", () => {
    test("Return when authorization is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield productBusinessMock.deleteProduct("", "product_id");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Login first");
        }
    }));
    test("Return when productId is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield productBusinessMock.deleteProduct("mocked_token", "");
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Enter a product id");
        }
    }));
    test("Return when user is not an admin", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const token = "mocked_aidi";
            const result = yield productBusinessMock.deleteProduct(token, "product_id");
            const admin = UserMock_1.userMock.getId();
            if (token != admin) {
                throw new Error("Just administrator can edit the price");
            }
            expect(result).toThrowError();
        }
        catch (error) {
            expect(error.message).toEqual("Just administrator can edit the price");
        }
    }));
    test("Return when editPrice is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const token = "mocked_id";
            const result = yield productBusinessMock.deleteProduct(token, "mocked_productId");
            const admin = UserMock_1.userMock.getId();
            expect(token).toEqual(admin);
            expect(result).toBeUndefined();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }));
});
//# sourceMappingURL=ProductBusiness.test.js.map