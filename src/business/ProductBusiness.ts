import { ProductData } from "../data/ProductData"
import { UserData } from "../data/UserData"
import { Product } from "../models/Product"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class ProductBusiness {
    constructor (
        private authenticator: Authenticator,
        private idGenerator: IdGenerator,
        private productData: ProductData,
        private userData: UserData
    ) {}

    insertProduct = async(name: string, productImg: string, price: number, tags: string, description: string, token: string) => {
        if(!token) {
            throw new Error("Login First")
        }
        if(!name) {
            throw new Error("Enter a name")
        }
        if(!productImg) {
            throw new Error("Enter a link for productImg")
        } else if (productImg.indexOf("https://") === -1) {
            throw new Error("Enter a valid link")
        }
        if(!price) {
            throw new Error("Enter a price")
        } else if (price <= 0) {
            throw new Error("Enter a valid price")
        }
        if(!tags) {
            throw new Error("Enter a tags")
        }
        if(!description) {
            throw new Error("Enter a description")
        }

        const userId = this.authenticator.getTokenData(token)
        const identify = await this.userData.getUserById(userId.id)

        if(identify.role != "Administrator") {
            throw new Error("Just admin can insert products")
        }
        const id = this.idGenerator.generateId()

        await this.productData.insertProduct(
            new Product (
                id,
                name,
                productImg,
                price,
                tags,
                description
            )
        )
    }

    getProducts = async (productName: string) => {
        if(!productName) {
            const response = await this.productData.getProducts()

            return response
        }

        if(productName){
            const result = await this.productData.getProductByName(productName)

            return result
        }
    }

    editPrice = async(token: string, price: number, productId: string) => {
        if(!token) {
            throw new Error("Login first")
        }
        if(!price) {
            throw new Error("Enter a price")
        }

        const userId = this.authenticator.getTokenData(token)
        const identify = await this.userData.getUserById(userId.id)

        if(identify.role != "Administrator") {
            throw new Error("Just administrator can edit the price")
        }
        await this.productData.editPrice(price, productId)
    }

    deleteProduct = async(token: string, productId: string) => {
        if(!token) {
            throw new Error("Login first")
        }
        if(!productId) {
            throw new Error("Enter a product id")
        }

        const userId = this.authenticator.getTokenData(token)
        const identify = await this.userData.getUserById(userId.id)

        if(identify.role != "Administrator") {
            throw new Error("Just admin can delete product")
        }

        await this.productData.deleteProduct(productId)
    }

}