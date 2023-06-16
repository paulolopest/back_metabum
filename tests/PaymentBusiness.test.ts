import { PaymentBusiness } from "../src/business/PaymentBusiness"
import { IdGenerator } from "../src/services/IdGenerator"
import { PaymenteDatabaseMock } from "./mocks/paymentMock/PaymenteDatabaseMock"
import { AuthenticatorMock } from "./mocks/servicesMock/AuthenticatorMock"
import { userMock } from "./mocks/userMock/UserMock"

const paymentBusinessMock = new PaymentBusiness(
    new AuthenticatorMock(),
    new IdGenerator(),
    new PaymenteDatabaseMock() as any
)

describe("Credit Payment test", () => {
    test("Return when authorization is missing", async () => {
        expect.assertions
        try {
            const result = await paymentBusinessMock.creditPayment(
                "1234567891012345",
                "123",
                "MasterCard",
                "",
                "mocked_productId",
                "2030/10/01" as unknown as Date
            )

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test("Return when card number is missing", async () => {
        expect.assertions
        try {
            const result = await paymentBusinessMock.creditPayment(
                "",
                "123",
                "MasterCard",
                "mocked_token",
                "mocked_productId",
                "2030/10/01" as unknown as Date
            )

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a card number")
        }
    })

    test("Return when card cvv is missing", async () => {
        expect.assertions
        try {
            const result = await paymentBusinessMock.creditPayment(
                "1234567891012345",
                "",
                "MasterCard",
                "mocked_token",
                "mocked_productId",
                "2030/10/01" as unknown as Date
            )

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a CVV")
        }
    })

    test("Return when card name is missing", async () => {
        expect.assertions
        try {
            const result = await paymentBusinessMock.creditPayment(
                "1234567891012345",
                "123",
                "",
                "mocked_token",
                "mocked_productId",
                "2030/10/01" as unknown as Date
            )

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a card name")
        }
    })

    test("Return when validation date is missing", async () => {
        expect.assertions
        try {
            const result = await paymentBusinessMock.creditPayment(
                "1234567891012345",
                "123",
                "CardName",
                "mocked_token",
                "mocked_productId",
                "" as unknown as Date
            )

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a card validation date")
        }
    })

    test("Return when validation date is wrong", async () => {
        expect.assertions
        try {
            const result = await paymentBusinessMock.creditPayment(
                "1234567891012345",
                "123",
                "CardName",
                "mocked_token",
                "mocked_productId",
                "2020/09/06" as unknown as Date
            )

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Invalid date")
        }
    })

    test("Return when creditPayment is correct", async () => {
        expect.assertions
        try {
            const result = await paymentBusinessMock.creditPayment(
                "1234567891012345",
                "123",
                "CardName",
                "mocked_token",
                "mocked_productId",
                "2030/09/06" as unknown as Date
            )

            expect(result).toBeUndefined()
        } catch (error:any) {
            throw new Error(error.message)
        }
    })
})

describe("Boleto Payment test", () => {
    test("Return when authorization is missing", async () => {
        expect.assertions
        try {
            const result = await paymentBusinessMock.boletoPayment(
                "",
                "mocked_productId"
            )

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test("Return when boleto payment is correct", async () => {
        expect.assertions
        try {
            const result = await paymentBusinessMock.boletoPayment(
                "mocked_token",
                "mocked_productId"
            )

            expect(result).toBeUndefined()
        } catch (error:any) {
            throw new Error(error.message)
        }
    })
})

describe("Get Card test", () => {
    test("Return when authorization is missing", async () => {
        expect.assertions
        try {
            const result = await paymentBusinessMock.getCardPayment(
                "",
            )

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test("Return when getCard is correct", async () => {
        expect.assertions
        try {
            const token = "mocked_id"
            const result = await paymentBusinessMock.getCardPayment(
                token,
            )

            expect(token).toEqual(userMock.getId())
            expect(result).toBeTruthy()
        } catch (error:any) {
            throw new Error(error.message)
        }
    })
})

describe("Get boleto test", () => {
    test("Return when authorization is missing", async () => {
        expect.assertions
        try {
            const result = await paymentBusinessMock.getBoletoPayment(
                "",
            )

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test("Return when getCard is correct", async () => {
        expect.assertions
        try {
            const token = "mocked_id"
            const result = await paymentBusinessMock.getBoletoPayment(
                token,
            )

            expect(token).toEqual(userMock.getId())
            expect(result).toBeTruthy()
        } catch (error:any) {
            throw new Error(error.message)
        }
    })
})
