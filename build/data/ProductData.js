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
exports.ProductData = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class ProductData extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insertProduct = (product) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.connection("metabum_products")
                .insert({
                id: product.id,
                name: product.name,
                product_img: product.productImg,
                price: product.price,
                tags: product.tags,
                description: product.description
            });
        });
        this.getProducts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("metabum_products");
                return response;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getProductByName = (productName) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.connection("metabum_products")
                    .where("tags", "like", `%${productName}%`)
                    .or
                    .where("name", "like", `%${productName}%`);
                return result;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.editPrice = (price, productId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("metabum_products")
                    .update({ price: price })
                    .where({ id: productId });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.deleteProduct = (productId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("metabum_products")
                    .delete()
                    .where({ id: productId });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.ProductData = ProductData;
//# sourceMappingURL=ProductData.js.map