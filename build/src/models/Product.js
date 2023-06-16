"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(id, name, productImg, price, tags, description) {
        this.id = id;
        this.name = name;
        this.productImg = productImg;
        this.price = price;
        this.tags = tags;
        this.description = description;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getProductImg() {
        return this.productImg;
    }
    getPrice() {
        return this.price;
    }
    getTags() {
        return this.tags;
    }
    getDescription() {
        return this.description;
    }
}
exports.Product = Product;
//# sourceMappingURL=Product.js.map