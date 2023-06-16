import { AuthenticationData } from "./AuthenticationData"

export class CreditPayment {
    constructor(
        private id: string,
        private userId: AuthenticationData,
        private productId: string,
        private cardNumber: string,
        private cardName: string,
        private cardValidation: Date,
        private date: Date
    ) {}

    public getId(): string {
        return this.id
    }
    public getUserId(): AuthenticationData {
        return this.userId
    }
    public getProductId(): string {
        return this.productId
    }
    public getCardNumber(): string {
        return this.cardNumber
    }
    public getCardName(): string {
        return this.cardName
    }
    public getCardValidation(): Date {
        return this.cardValidation
    }
    public getDate(): Date {
        return this.date
    }
}

export class BoletoPayment {
    constructor(
        private id: string,
        private userId: AuthenticationData,
        private productId: string,
        private date: Date,
        private barCode: string
    ) {}

    public getId(): string {
        return this.id
    }
    public getUserId(): AuthenticationData {
        return this.userId
    }
    public getProductId(): string {
        return this.productId
    }
    public getDate(): Date {
        return this.date
    }
    public getBarCode(): string {
        return this.barCode
    }
    
}