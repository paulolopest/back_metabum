"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoletoPayment = exports.CreditPayment = void 0;
class CreditPayment {
    constructor(id, userId, productId, cardNumber, cardName, cardValidation, date) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.cardNumber = cardNumber;
        this.cardName = cardName;
        this.cardValidation = cardValidation;
        this.date = date;
    }
    getId() {
        return this.id;
    }
    getUserId() {
        return this.userId;
    }
    getProductId() {
        return this.productId;
    }
    getCardNumber() {
        return this.cardNumber;
    }
    getCardName() {
        return this.cardName;
    }
    getCardValidation() {
        return this.cardValidation;
    }
    getDate() {
        return this.date;
    }
}
exports.CreditPayment = CreditPayment;
class BoletoPayment {
    constructor(id, userId, productId, date, barCode) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.date = date;
        this.barCode = barCode;
    }
    getId() {
        return this.id;
    }
    getUserId() {
        return this.userId;
    }
    getProductId() {
        return this.productId;
    }
    getDate() {
        return this.date;
    }
    getBarCode() {
        return this.barCode;
    }
}
exports.BoletoPayment = BoletoPayment;
//# sourceMappingURL=Payment.js.map