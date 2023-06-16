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
exports.PaymentData = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class PaymentData extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.creditPayment = (creditPayment) => __awaiter(this, void 0, void 0, function* () {
            yield this.connection("metabum_creditPayment")
                .insert({
                id: creditPayment.getId(),
                user_id: creditPayment.getUserId(),
                product_id: creditPayment.getProductId(),
                card_number: creditPayment.getCardNumber(),
                card_name: creditPayment.getCardName(),
                card_validation: creditPayment.getCardValidation(),
                date: creditPayment.getDate()
            });
        });
        this.boletoPayment = (boletoPayment) => __awaiter(this, void 0, void 0, function* () {
            yield this.connection("metabum_boletoPayment")
                .insert({
                id: boletoPayment.getId(),
                user_id: boletoPayment.getUserId(),
                product_id: boletoPayment.getProductId(),
                date: boletoPayment.getDate(),
                bar_code: boletoPayment.getBarCode()
            });
        });
        this.getCardPayment = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection("metabum_creditPayment")
                .where({ user_id: userId });
            return result;
        });
        this.getBoletoPayment = (userId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection("metabum_boletoPayment")
                .where({ user_id: userId });
            return result;
        });
    }
}
exports.PaymentData = PaymentData;
//# sourceMappingURL=PaymentData.js.map