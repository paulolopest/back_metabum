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
exports.PaymenteDatabaseMock = void 0;
const PaymentMock_1 = require("./PaymentMock");
class PaymenteDatabaseMock {
    constructor() {
        this.creditPayment = (creditPayment) => __awaiter(this, void 0, void 0, function* () { });
        this.boletoPayment = (boletoPayment) => __awaiter(this, void 0, void 0, function* () { });
        this.getCardPayment = (userId) => __awaiter(this, void 0, void 0, function* () {
            if (userId === "mocked_id") {
                return PaymentMock_1.creditPaymentMock;
            }
            else {
                return undefined;
            }
        });
        this.getBoletoPayment = (userId) => __awaiter(this, void 0, void 0, function* () {
            if (userId === "mocked_id") {
                return PaymentMock_1.boletoPaymentMock;
            }
            else {
                return undefined;
            }
        });
    }
}
exports.PaymenteDatabaseMock = PaymenteDatabaseMock;
//# sourceMappingURL=PaymenteDatabaseMock.js.map