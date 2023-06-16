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
exports.ProductController = void 0;
const Classes_1 = require("../models/Classes");
class ProductController {
    constructor() {
        this.insertProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { name, productImg, price, tags, description } = req.body;
                const response = yield Classes_1.productBusiness.insertProduct(name, productImg, price, tags, description, token);
                res.status(201).send("Product added to stock");
            }
            catch (error) {
                res.status(500).send(error.message || error.sqlMessage);
            }
        });
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { productName } = req.query;
                const response = yield Classes_1.productBusiness.getProducts(productName);
                res.send(response);
            }
            catch (error) {
                res.status(500).send(error.message || error.sqlMessage);
            }
        });
        this.editPrice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const productId = req.params.productId;
                const { price } = req.body;
                const response = yield Classes_1.productBusiness.editPrice(token, price, productId);
                res.send(`The product price was updated to ${price}`);
            }
            catch (error) {
                res.status(500).send(error.message || error.sqlMessage);
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const productId = req.params.productId;
                const response = yield Classes_1.productBusiness.deleteProduct(token, productId);
                res.send("Product deleted");
            }
            catch (error) {
                res.status(500).send(error.message || error.sqlMessage);
            }
        });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map