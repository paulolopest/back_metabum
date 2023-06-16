import { BoletoPayment, CreditPayment } from "../../../src/models/Payment";
import { cardMock } from "../cardMock/CardMock";
import { productMock } from "../productMock/ProductMock";
import { userMock } from "../userMock/UserMock";

export const creditPaymentMock = new CreditPayment (
    "mocked_credit_payment_id",
    userMock.getId() as any,
    productMock.getId(),
    cardMock.getNumber(),
    cardMock.getName(),
    cardMock.getValidationDate(),
    "2022/10/10" as unknown as Date
)

export const boletoPaymentMock = new BoletoPayment (
    "mocked_boletoPayment_id",
    userMock.getId() as any,
    productMock.getId(),
    "2022/10/10" as unknown as Date,
    "mocked_barCode"
)