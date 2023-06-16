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
exports.ProductDatabaseMock = void 0;
const ProductMock_1 = require("./ProductMock");
class ProductDatabaseMock {
    constructor() {
        this.insertProduct = (product) => __awaiter(this, void 0, void 0, function* () { });
        this.getProducts = () => __awaiter(this, void 0, void 0, function* () {
            return [ProductMock_1.productMock];
        });
        this.getProductByName = (productName) => __awaiter(this, void 0, void 0, function* () {
            if (productName === "ps5") {
                return ProductMock_1.productMock;
            }
            else {
                undefined;
            }
        });
        this.editPrice = (price, productId) => __awaiter(this, void 0, void 0, function* () { });
        this.deleteProduct = (productId) => __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.ProductDatabaseMock = ProductDatabaseMock;
//# sourceMappingURL=ProductDatabaseMock.js.map