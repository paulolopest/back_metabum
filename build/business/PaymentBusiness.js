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
exports.PaymentBusiness = void 0;
const Classes_1 = require("../models/Classes");
const Date_1 = require("../services/Date");
class PaymentBusiness {
    constructor() {
        this.creditPayment = (cardNumber, cvv, cardName, token, productId, cardValidation) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            if (!cardNumber) {
                throw new Error("Enter a card number");
            }
            if (!cvv) {
                throw new Error("Enter a CVV");
            }
            if (!cardName) {
                throw new Error("Enter a card name");
            }
            if (!cardValidation) {
                throw new Error("Enter a card validation date");
            }
            const userId = Classes_1.authenticator.getTokenData(token);
            const id = Classes_1.idGenerator.generateId();
            let today = new Date();
            const isInvalid = yield (0, Date_1.verifyDate)(cardValidation);
            if (isInvalid) {
                throw new Error("Invalid date");
            }
            const response = yield Classes_1.paymentData.creditPayment({
                id: id,
                userId: userId.id,
                productId: productId,
                cardNumber: cardNumber,
                cardName: cardName,
                cardValidation: cardValidation,
                date: today
            });
        });
        this.boletoPayment = (token, productId) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            const paymentId = Classes_1.idGenerator.generateId();
            const userId = Classes_1.authenticator.getTokenData(token);
            const today = new Date();
            const barCode = Classes_1.idGenerator.generateId();
            const response = yield Classes_1.paymentData.boletoPayment({
                id: paymentId,
                userId: userId.id,
                productId: productId,
                date: today,
                barCode: barCode
            });
        });
        this.getCardPayment = (token) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            const userId = Classes_1.authenticator.getTokenData(token);
            const response = yield Classes_1.paymentData.getCardPayment(userId.id);
            return response;
        });
        this.getBoletoPayment = (token) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            const userId = Classes_1.authenticator.getTokenData(token);
            const response = yield Classes_1.paymentData.getBoletoPayment(userId.id);
            return response;
        });
    }
}
exports.PaymentBusiness = PaymentBusiness;
//# sourceMappingURL=PaymentBusiness.js.map