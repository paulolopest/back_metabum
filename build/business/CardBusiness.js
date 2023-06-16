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
exports.CardBusiness = void 0;
const Classes_1 = require("../models/Classes");
const Date_1 = require("../services/Date");
class CardBusiness {
    constructor() {
        this.createCard = (name, number, cvv, validationDate, token) => __awaiter(this, void 0, void 0, function* () {
            if (!name) {
                throw new Error("Enter a name");
            }
            if (!number) {
                throw new Error("Enter a card number");
            }
            else if (number.length != 16) {
                throw new Error("Invalid card number. The card must contain 16 characters");
            }
            if (!cvv) {
                throw new Error("Enter a cvv");
            }
            else if (cvv.length != 3) {
                throw new Error("Invalid cvv. The cvv must contain 3 characters");
            }
            if (!validationDate) {
                throw new Error("Enter a validation date");
            }
            const isInvalid = yield (0, Date_1.verifyDate)(validationDate);
            if (isInvalid) {
                throw new Error("Invalid Date");
            }
            if (!token) {
                throw new Error("Login first");
            }
            const userId = Classes_1.authenticator.getTokenData(token);
            const cardExist = yield Classes_1.cardData.validateCard(number, userId.id);
            if (cardExist) {
                throw new Error("Card already registered");
            }
            const id = Classes_1.idGenerator.generateId();
            const cypherCvv = yield Classes_1.hashManager.generateHash(cvv);
            yield Classes_1.cardData.createCard({
                id: id,
                name: name,
                number: number,
                cvv: cypherCvv,
                validationDate: validationDate,
                userId: userId.id
            });
        });
        this.getAllCards = (token) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            const userId = Classes_1.authenticator.getTokenData(token);
            const response = yield Classes_1.cardData.getAllCards(userId.id);
            return response;
        });
        this.deleteCard = (token, cardId) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            if (!cardId) {
                throw new Error("Enter a card id");
            }
            const response = yield Classes_1.cardData.deleteCard(cardId);
        });
    }
}
exports.CardBusiness = CardBusiness;
//# sourceMappingURL=CardBusiness.js.map