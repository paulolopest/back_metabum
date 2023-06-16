"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
class Card {
    constructor(id, name, number, cvv, validationDate, userId) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.cvv = cvv;
        this.validationDate = validationDate;
        this.userId = userId;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getNumber() {
        return this.number;
    }
    getCvv() {
        return this.cvv;
    }
    getValidationDate() {
        return this.validationDate;
    }
    getUserId() {
        return this.userId;
    }
}
exports.Card = Card;
//# sourceMappingURL=Card.js.map