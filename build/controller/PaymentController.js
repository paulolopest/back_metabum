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
exports.PaymentController = void 0;
const Classes_1 = require("../models/Classes");
class PaymentController {
    constructor() {
        this.creditPayment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const productId = req.params.productId;
                const { cardNumber, cvv, cardName, cardValidation } = req.body;
                const response = yield Classes_1.paymentBusiness.creditPayment(cardNumber, cvv, cardName, token, productId, cardValidation);
                res.send("Purchase made");
            }
            catch (error) {
                res.send(error.message || error.sqlMessage);
            }
        });
        this.boletoPayment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const productId = req.params.productId;
                const response = yield Classes_1.paymentBusiness.boletoPayment(token, productId);
                res.send("Purchase made");
            }
            catch (error) {
                res.send(error.message || error.sqlMessage);
            }
        });
        this.getBoletoPayment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const response = yield Classes_1.paymentBusiness.getBoletoPayment(token);
                res.send(response);
            }
            catch (error) {
                res.send(error.message || error.sqlMessage);
            }
        });
        this.getCardPayment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const response = yield Classes_1.paymentBusiness.getCardPayment(token);
                res.send(response);
            }
            catch (error) {
                res.send(error.message || error.sqlMessage);
            }
        });
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=PaymentController.js.map