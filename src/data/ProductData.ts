import { Product } from "../models/Product";
import { BaseDatabase } from "./BaseDatabase";

export class ProductData extends BaseDatabase {
    insertProduct = async(product: Product) => {
        await this.connection("metabum_products")
        .insert({
            id: product.getId(),
            name: product.getName(),
            product_img: product.getProductImg(),
            price: product.getPrice(),
            tags: product.getTags(),
            description: product.getDescription()
        })
    }

    getProducts = async() => {
        try {
            const response = await this.connection("metabum_products")

            return response
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getProductByName = async(productName: string) => {
        try {
            const result = await this.connection("metabum_products")
            .where("tags", "like", `%${productName}%`)
            .or
            .where("name", "like", `%${productName}%`)

            return result
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    editPrice = async(price: number, productId: string) => {
        try {
            const response = await this.connection("metabum_products")
            .update({price: price})
            .where({id: productId})
        }catch (error:any) {
            throw new Error(error.message)
        }
    }

    deleteProduct = async(productId: string) => {
        try {
            const response = await this.connection("metabum_products")
            .delete()
            .where({id: productId})
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

}