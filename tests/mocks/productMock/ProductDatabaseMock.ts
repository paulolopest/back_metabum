import { Product } from "../../../src/models/Product";
import { productMock } from "./ProductMock";

export class ProductDatabaseMock {
    public insertProduct = async(product: Product) => {}

    public getProducts = async() => {
        return [productMock]
    }

    public getProductByName = async(productName: string) => {
        if (productName === "ps5") {
            return productMock
        } else {
            undefined
        }
    }

    public editPrice = async(price: number, productId: string) => {}

    public deleteProduct = async(productId: string) => {}
}