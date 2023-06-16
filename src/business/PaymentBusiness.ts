import { PaymentData } from "../data/PaymentData";
import { BoletoPayment, CreditPayment } from "../models/Payment";
import { Authenticator } from "../services/Authenticator";
import { verifyDate } from "../services/Date";
import { IdGenerator } from "../services/IdGenerator";

export class PaymentBusiness {
    constructor (
        private authenticator: Authenticator,
        private idGenerator: IdGenerator,
        private paymentData: PaymentData
    ) {}

    creditPayment = async(cardNumber: string, cvv: string, cardName: string, token: string, productId: string, cardValidation: Date) => {
        if(!token) {
            throw new Error("Login first")
        }
        if(!cardNumber) {
            throw new Error("Enter a card number")
        }
        if(!cvv) {
            throw new Error("Enter a CVV")
        }
        if(!cardName) {
            throw new Error("Enter a card name")
        }
        if(!cardValidation) {
            throw new Error("Enter a card validation date")
        }

        const userId = this.authenticator.getTokenData(token)
        const id = this.idGenerator.generateId()
        
        let today = new Date()

        const isInvalid = await verifyDate(cardValidation)
        if(isInvalid) {
            throw new Error("Invalid date")
        }

        await this.paymentData.creditPayment(
            new CreditPayment (
                id,
                userId,
                productId,
                cardNumber,
                cardName,
                cardValidation,
                today
            )
        )
    }

    boletoPayment = async(token: string, productId: string) => {
        if(!token) {
            throw new Error("Login first")
        }

        const paymentId = this.idGenerator.generateId()
        const userId = this.authenticator.getTokenData(token)
        const today = new Date()
        const barCode = this.idGenerator.generateId()

        await this.paymentData.boletoPayment(
            new BoletoPayment (
                paymentId,
                userId,
                productId,
                today,
                barCode
            )
        )
    }

    getCardPayment = async(token: string) => {
        if(!token) {
            throw new Error("Login first")
        }
        const userId = this.authenticator.getTokenData(token)
        const response = await this.paymentData.getCardPayment(userId.id)

        return response
    }
    
    getBoletoPayment = async(token: string) => {
        if(!token) {
            throw new Error("Login first")
        }
        const userId = this.authenticator.getTokenData(token)
        const response = await this.paymentData.getBoletoPayment(userId.id)

        return response
    }
}
