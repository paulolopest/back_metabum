import { BoletoPayment, CreditPayment } from "../models/Payment";
import { BaseDatabase } from "./BaseDatabase";

export class PaymentData extends BaseDatabase {
    creditPayment = async(creditPayment: CreditPayment) => {
        await this.connection("metabum_creditPayment")
        .insert({
            id: creditPayment.getId(),
            user_id: creditPayment.getUserId(),
            product_id: creditPayment.getProductId(),
            card_number: creditPayment.getCardNumber(),
            card_name: creditPayment.getCardName(),
            card_validation: creditPayment.getCardValidation(),
            date: creditPayment.getDate()
        })
    }

    boletoPayment = async(boletoPayment: BoletoPayment) => {
        await this.connection("metabum_boletoPayment")
        .insert({
            id: boletoPayment.getId(),
            user_id: boletoPayment.getUserId(),
            product_id: boletoPayment.getProductId(),
            date: boletoPayment.getDate(),
            bar_code: boletoPayment.getBarCode()
        })
    }

    getCardPayment = async(userId: string) => {
        const result = await this.connection("metabum_creditPayment")
        .where({user_id: userId})

        return result
    }

    getBoletoPayment = async(userId: string) => {
        const result = await this.connection("metabum_boletoPayment")
        .where({user_id: userId})

        return result
    }

}