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
exports.CardController = void 0;
class CardController {
    constructor(cardBusiness) {
        this.cardBusiness = cardBusiness;
        this.createCard = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { name, number, cvv, validationDate } = req.body;
                const response = yield this.cardBusiness.createCard(name, number, cvv, validationDate, token);
                res.status(201).send("The card was successfully registered");
            }
            catch (error) {
                res.send(error.message || error.sqlMessage);
            }
        });
        this.getAllCards = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const response = yield this.cardBusiness.getAllCards(token);
                res.status(201).send(response);
            }
            catch (error) {
                res.send(error.message || error.sqlMessage);
            }
        });
        this.deleteCard = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const cardId = req.params.cardId;
                const response = yield this.cardBusiness.deleteCard(token, cardId);
                res.send("Card deleted");
            }
            catch (error) {
                res.send(error.message || error.sqlMessage);
            }
        });
    }
}
exports.CardController = CardController;
//# sourceMappingURL=CardController.js.map