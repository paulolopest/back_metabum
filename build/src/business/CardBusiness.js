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
const Card_1 = require("../models/Card");
const Date_1 = require("../services/Date");
class CardBusiness {
    constructor(authenticator, hashManager, idGenerator, cardData) {
        this.authenticator = authenticator;
        this.hashManager = hashManager;
        this.idGenerator = idGenerator;
        this.cardData = cardData;
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
            const userId = this.authenticator.getTokenData(token);
            const cardExist = yield this.cardData.validateCard(number, userId.id);
            if (cardExist) {
                throw new Error("Card already registered");
            }
            const id = this.idGenerator.generateId();
            const cypherCvv = yield this.hashManager.generateHash(cvv);
            yield this.cardData.createCard(new Card_1.Card(id, name, number, cypherCvv, validationDate, userId));
        });
        this.getAllCards = (token) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            const userId = this.authenticator.getTokenData(token);
            const response = yield this.cardData.getAllCards(userId.id);
            return response;
        });
        this.deleteCard = (token, cardId) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            if (!cardId) {
                throw new Error("Enter a card id");
            }
            const response = yield this.cardData.deleteCard(cardId);
        });
    }
}
exports.CardBusiness = CardBusiness;
//# sourceMappingURL=CardBusiness.js.map