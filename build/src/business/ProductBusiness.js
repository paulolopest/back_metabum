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
exports.ProductBusiness = void 0;
const Product_1 = require("../models/Product");
class ProductBusiness {
    constructor(authenticator, idGenerator, productData, userData) {
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
        this.productData = productData;
        this.userData = userData;
        this.insertProduct = (name, productImg, price, tags, description, token) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login First");
            }
            if (!name) {
                throw new Error("Enter a name");
            }
            if (!productImg) {
                throw new Error("Enter a link for productImg");
            }
            else if (productImg.indexOf("https://") === -1) {
                throw new Error("Enter a valid link");
            }
            if (!price) {
                throw new Error("Enter a price");
            }
            else if (price <= 0) {
                throw new Error("Enter a valid price");
            }
            if (!tags) {
                throw new Error("Enter a tags");
            }
            if (!description) {
                throw new Error("Enter a description");
            }
            const userId = this.authenticator.getTokenData(token);
            const identify = yield this.userData.getUserById(userId.id);
            if (identify.role != "Administrator") {
                throw new Error("Just admin can insert products");
            }
            const id = this.idGenerator.generateId();
            yield this.productData.insertProduct(new Product_1.Product(id, name, productImg, price, tags, description));
        });
        this.getProducts = (productName) => __awaiter(this, void 0, void 0, function* () {
            if (!productName) {
                const response = yield this.productData.getProducts();
                return response;
            }
            if (productName) {
                const result = yield this.productData.getProductByName(productName);
                return result;
            }
        });
        this.editPrice = (token, price, productId) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            if (!price) {
                throw new Error("Enter a price");
            }
            const userId = this.authenticator.getTokenData(token);
            const identify = yield this.userData.getUserById(userId.id);
            if (identify.role != "Administrator") {
                throw new Error("Just administrator can edit the price");
            }
            yield this.productData.editPrice(price, productId);
        });
        this.deleteProduct = (token, productId) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            if (!productId) {
                throw new Error("Enter a product id");
            }
            const userId = this.authenticator.getTokenData(token);
            const identify = yield this.userData.getUserById(userId.id);
            if (identify.role != "Administrator") {
                throw new Error("Just admin can delete product");
            }
            yield this.productData.deleteProduct(productId);
        });
    }
}
exports.ProductBusiness = ProductBusiness;
//# sourceMappingURL=ProductBusiness.js.map