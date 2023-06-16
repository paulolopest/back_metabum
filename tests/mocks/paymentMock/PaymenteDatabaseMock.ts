import { BoletoPayment, CreditPayment } from "../../../src/models/Payment";
import { boletoPaymentMock, creditPaymentMock } from "./PaymentMock";

export class PaymenteDatabaseMock {
    creditPayment = async(creditPayment: CreditPayment) => {}

    boletoPayment = async(boletoPayment: BoletoPayment) => {}

    getCardPayment = async(userId: string) => {
        if (userId === "mocked_id") {
            return creditPaymentMock
        } else {
            return undefined
        }
    }

    getBoletoPayment = async(userId: string) => {
        if (userId === "mocked_id") {
            return boletoPaymentMock
        } else {
            return undefined
        }
    }
}