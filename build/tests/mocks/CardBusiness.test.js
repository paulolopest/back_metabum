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
const CardBusiness_1 = require("../../src/business/CardBusiness");
const CardDatabase_1 = require("./cardMock/CardDatabase");
const AuthenticatorMock_1 = require("./services/AuthenticatorMock");
const HashManagerMock_1 = require("./services/HashManagerMock");
const IdGeneratorMock_1 = require("./services/IdGeneratorMock");
const cardBusinessMock = new CardBusiness_1.CardBusiness(new AuthenticatorMock_1.AuthenticatorMock(), new HashManagerMock_1.HashManagerMock(), new IdGeneratorMock_1.IdGeneratorMock(), new CardDatabase_1.CardDatabaseMock());
describe("Create Card test", () => {
    test("Return when name is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield cardBusinessMock.createCard("", "1234567891012131", "123", "2030/30/01", "mocked_id");
            expect(result).toBeDefined();
        }
        catch (error) {
            console.log(error.message);
            expect(error.message).toEqual("Enter a name");
        }
    }));
});
//# sourceMappingURL=CardBusiness.test.js.map