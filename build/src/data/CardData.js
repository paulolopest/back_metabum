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
exports.CardData = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class CardData extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.createCard = (card) => __awaiter(this, void 0, void 0, function* () {
            yield this.connection("metabum_card")
                .insert({
                id: card.getId(),
                name: card.getName(),
                number: card.getNumber(),
                cvv: card.getCvv(),
                validation_date: card.getValidationDate(),
                user_id: card.getUserId()
            });
        });
        this.selectCardByNumber = (number) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("metabum_card")
                    .where({ number: number });
                return response[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.validateCard = (number, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("metabum_card")
                    .select("*")
                    .where({ user_id: id })
                    .and
                    .where({ number: number });
                return response[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getAllCards = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("metabum_card")
                    .where({ user_id: userId });
                return response;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.deleteCard = (cardId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("metabum_card")
                    .delete()
                    .where({ id: cardId });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.CardData = CardData;
//# sourceMappingURL=CardData.js.map