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
exports.CardDatabaseMock = void 0;
const CardMock_1 = require("./CardMock");
class CardDatabaseMock {
    constructor() {
        this.createCard = (card) => __awaiter(this, void 0, void 0, function* () { });
        this.selectCardByNumber = (number) => __awaiter(this, void 0, void 0, function* () {
            if (number === "1234567891098765") {
                return CardMock_1.cardMock;
            }
            else {
                return undefined;
            }
        });
        this.validateCard = (number, id) => __awaiter(this, void 0, void 0, function* () {
            if (number === "1234567891098765" && id === "mocked_id") {
                return CardMock_1.cardMock;
            }
            else {
                return undefined;
            }
        });
        this.getAllCards = (userId) => __awaiter(this, void 0, void 0, function* () {
            if (userId = "mocked_userId") {
                return CardMock_1.cardMock;
            }
            else {
                return undefined;
            }
        });
        this.deleteCard = (token, cardId) => __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.CardDatabaseMock = CardDatabaseMock;
//# sourceMappingURL=CardDatabase.js.map