export class Product {
    constructor (
       private id: string,
       private name: string, 
       private productImg: string, 
       private price: number,
       private tags: string,
       private description: string
    ) {}
    
    getId():any  {
        return this.id
    }
    getName():any  {
        return this.name
    }
    getProductImg():any  {
        return this.productImg
    }
    getPrice():any  {
        return this.price
    }
    getTags():any  {
        return this.tags
    }
    getDescription():any  {
        return this.description
    }
}