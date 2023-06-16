import { CardBusiness } from "../src/business/CardBusiness";
import { verifyDate } from "../src/services/Date";
import { CardDatabaseMock } from "./mocks/cardMock/CardDatabase";
import { AuthenticatorMock } from "./mocks/servicesMock/AuthenticatorMock";
import { HashManagerMock } from "./mocks/servicesMock/HashManagerMock";
import { IdGeneratorMock } from "./mocks/servicesMock/IdGeneratorMock";

const cardBusinessMock = new CardBusiness(
  new AuthenticatorMock(),
  new HashManagerMock(),
  new IdGeneratorMock(),
  new CardDatabaseMock() as any
);

describe("Create Card test", () => {
    test("Return when name is empty", async() => {
        expect.assertions
        try {
            const result = await cardBusinessMock.createCard(
                "",
                "1234567891012131",
                "123",
                "2030/30/01" as unknown as Date,
                "mocked_id"
            )

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a name")
        }
    })

    test("Return when number is empty", async() => {
        expect.assertions
        try {
            const result = await cardBusinessMock.createCard(
                "MasterCard",
                "",
                "123",
                "2030/30/01" as unknown as Date,
                "mocked_id"
            )

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a card number")
        }
    })

    test("Return when cvv is empty", async() => {
        expect.assertions
        try {
            const result = await cardBusinessMock.createCard(
                "MasterCard",
                "1234567891012131",
                "",
                "2030/30/01" as unknown as Date,
                "mocked_id"
            )

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a cvv")
        }
    })

    test("Return when Date is empty", async() => {
        expect.assertions
        try {
            const result = await cardBusinessMock.createCard(
                "MasterCard",
                "1234567891012131",
                "123",
                "" as any,
                "mocked_id"
            )

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a validation date")
        }
    })
    
    test("Return when Date is validy", async() => {
        expect.assertions
        try {
            const result = await verifyDate("2030/12/31" as unknown as Date)
            
            expect(result).toBeFalsy()
        } catch (error:any) {
            expect(error.message).toEqual("Enter a validation date")
        }
    })
    
    test("Return when authorization is missing", async() => {
        expect.assertions
        try {
            const result = await cardBusinessMock.createCard(
                "MasterCard",
                "1234567891012131",
                "123",
                "2030/30/01" as unknown as Date,
                ""
            )
    
            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })
    
    test("Return when card is already registered", async() => {
        expect.assertions
        try {
            const result = await cardBusinessMock.createCard(
                "MasterCard",
                "1234567891098765",
                "123",
                "2030/30/01" as unknown as Date,
                "mocked_id"
            )
    
            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Card already registered")
        }
    })

    test("Return when cardRegister is correct", async() => {
        expect.assertions
        try {
            const result = await cardBusinessMock.createCard(
                "MasterCard",
                "1234557891098765",
                "123",
                "2030/30/01" as unknown as Date,
                "mocked_id"
            )
    
            expect(result).toBeUndefined()
        } catch (error:any) {
            expect(error.message).toEqual("Card already registered")
        }
    })
})

describe("Get All Cards test", () => {
    test("Return when authorization is missing", async () => {
        expect.assertions
        try {
            const result = await cardBusinessMock.getAllCards("")

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test("Return when getAllCards is correct", async () => {
        expect.assertions
        try {
            const result = await cardBusinessMock.getAllCards("mocked_userId")

            expect(result).toBeTruthy()
        } catch (error:any) {
            throw new Error(error.message)
        }
    })
})

describe("Delete card test", () => {
    test("Return when authorization is missing", async () => {
        expect.assertions
        try {
            const result = await cardBusinessMock.deleteCard("", "mocked_id")

            expect(result).toThrowError()
        } catch (error:any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test("Return when deleteCard is correct", async () => {
        expect.assertions
        try {
            const result = await cardBusinessMock.deleteCard("mocked_token", "mocked_id")

            expect(result).toBeUndefined()
        } catch (error:any) {
            throw new Error(error.message)
        }
    })
})