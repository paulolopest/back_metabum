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
const Payment_1 = require("../models/Payment");
const Date_1 = require("../services/Date");
class PaymentBusiness {
    constructor(authenticator, idGenerator, paymentData) {
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
        this.paymentData = paymentData;
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
            const userId = this.authenticator.getTokenData(token);
            const id = this.idGenerator.generateId();
            let today = new Date();
            const isInvalid = yield (0, Date_1.verifyDate)(cardValidation);
            if (isInvalid) {
                throw new Error("Invalid date");
            }
            yield this.paymentData.creditPayment(new Payment_1.CreditPayment(id, userId, productId, cardNumber, cardName, cardValidation, today));
        });
        this.boletoPayment = (token, productId) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            const paymentId = this.idGenerator.generateId();
            const userId = this.authenticator.getTokenData(token);
            const today = new Date();
            const barCode = this.idGenerator.generateId();
            yield this.paymentData.boletoPayment(new Payment_1.BoletoPayment(paymentId, userId, productId, today, barCode));
        });
        this.getCardPayment = (token) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            const userId = this.authenticator.getTokenData(token);
            const response = yield this.paymentData.getCardPayment(userId.id);
            return response;
        });
        this.getBoletoPayment = (token) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            const userId = this.authenticator.getTokenData(token);
            const response = yield this.paymentData.getBoletoPayment(userId.id);
            return response;
        });
    }
}
exports.PaymentBusiness = PaymentBusiness;
//# sourceMappingURL=PaymentBusiness.js.map