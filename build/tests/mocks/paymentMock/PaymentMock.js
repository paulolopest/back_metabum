"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boletoPaymentMock = exports.creditPaymentMock = void 0;
const Payment_1 = require("../../../src/models/Payment");
const CardMock_1 = require("../cardMock/CardMock");
const ProductMock_1 = require("../productMock/ProductMock");
const UserMock_1 = require("../userMock/UserMock");
exports.creditPaymentMock = new Payment_1.CreditPayment("mocked_credit_payment_id", UserMock_1.userMock.getId(), ProductMock_1.productMock.getId(), CardMock_1.cardMock.getNumber(), CardMock_1.cardMock.getName(), CardMock_1.cardMock.getValidationDate(), "2022/10/10");
exports.boletoPaymentMock = new Payment_1.BoletoPayment("mocked_boletoPayment_id", UserMock_1.userMock.getId(), ProductMock_1.productMock.getId(), "2022/10/10", "mocked_barCode");
//# sourceMappingURL=PaymentMock.js.map