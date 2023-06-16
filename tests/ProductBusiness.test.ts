import { ProductBusiness } from "../src/business/ProductBusiness"
import { ProductDatabaseMock } from "./mocks/productMock/ProductDatabaseMock"
import { AuthenticatorMock } from "./mocks/servicesMock/AuthenticatorMock"
import { IdGeneratorMock } from "./mocks/servicesMock/IdGeneratorMock"
import { UserDatabaseMock } from "./mocks/userMock/UserDatabaseMock"
import { userMock, userMock2 } from "./mocks/userMock/UserMock"

const productBusinessMock = new ProductBusiness (
    new AuthenticatorMock(),
    new IdGeneratorMock(),
    new ProductDatabaseMock() as any,
    new UserDatabaseMock() as any
)

describe("Insert Product test", () => {
    test("Return when authorization is missing", async () => {
        expect.assertions
        try{
            const result = await productBusinessMock.insertProduct(
                "ps5",
                "https://www.ps5.com",
                5000,
                "ps5",
                "videogame da sony",
                ""
            )
            
            expect(result).toBeDefined()
        } catch(error: any) {
            expect(error.message).toEqual("Login First")
        }
    })

    test("Return when name is missing", async () => {
        expect.assertions
        try{
            const result = await productBusinessMock.insertProduct(
                "",
                "https://www.ps5.com",
                5000,
                "ps5",
                "videogame da sony",
                "mocked_token"
            )
            
            expect(result).toBeDefined()
        } catch(error: any) {
            expect(error.message).toEqual("Enter a name")
        }
    })

    test("Return when productImg is missing", async () => {
        expect.assertions
        try{
            const result = await productBusinessMock.insertProduct(
                "ps5",
                "",
                5000,
                "ps5",
                "videogame da sony",
                "mocked_token"
            )
            
            expect(result).toBeDefined()
        } catch(error: any) {
            expect(error.message).toEqual("Enter a link for productImg")
        }
    })

    test("Return when productImg link is wrong", async () => {
        expect.assertions
        try{
            const result = await productBusinessMock.insertProduct(
                "ps5",
                "123123123",
                5000,
                "ps5",
                "videogame da sony",
                "mocked_token"
            )
            
            expect(result).toBeDefined()
        } catch(error: any) {
            expect(error.message).toEqual("Enter a valid link")
        }
    })

    test("Return when price is missing", async () => {
        expect.assertions
        try{
            const result = await productBusinessMock.insertProduct(
                "ps5",
                "https://www.ps5.com",
                "" as any,
                "ps5",
                "videogame da sony",
                "mocked_token"
            )
            
            expect(result).toBeDefined()
        } catch(error: any) {
            expect(error.message).toEqual("Enter a price")
        }
    })
    
    test("Return when price is invalid", async () => {
        expect.assertions
        try{
            const result = await productBusinessMock.insertProduct(
                "ps5",
                "https://www.ps5.com",
                -5000,
                "ps5",
                "videogame da sony",
                "mocked_token"
            )
            
            expect(result).toBeDefined()
        } catch(error: any) {
            expect(error.message).toEqual("Enter a valid price")
        }
    })
    
    test("Return when tags is missing", async () => {
        expect.assertions
        try{
            const result = await productBusinessMock.insertProduct(
                "ps5",
                "https://www.ps5.com",
                5000,
                "",
                "videogame da sony",
                "mocked_token"
            )
            
            expect(result).toBeDefined()
        } catch(error: any) {
            expect(error.message).toEqual("Enter a tags")
        }
    })
    
    test("Return when description is missing", async () => {
        expect.assertions
        try{
            const result = await productBusinessMock.insertProduct(
                "ps5",
                "https://www.ps5.com",
                5000,
                "sony",
                "",
                "mocked_token"
            )
            
            expect(result).toBeDefined()
        } catch(error: any) {
            expect(error.message).toEqual("Enter a description")
        }
    })
    
    test("Return when user is not a admin", async () => {
        expect.assertions
        try{
            const token = "mocked_toki"
            const result = await productBusinessMock.insertProduct(
                "ps5",
                "https://www.ps5.com",
                5000,
                "sony",
                "videogame",
                token
            )

            const verify = userMock2.getRole()

            if(verify != "Administrator") {
                throw new Error("Just admin can insert products")
            }

            expect(result).toBeDefined()
        } catch(error: any) {
            expect(error.message).toEqual("Just admin can insert products")
        }
    })
    
    test("Return when insertProduct is correct", async () => {
        expect.assertions
        try{
            const token = "mocked_id"
            const result = await productBusinessMock.insertProduct(
                "ps5",
                "https://www.ps5.com",
                5000,
                "sony",
                "videogame",
                token
            )

            const verify = userMock.getId()

            if(token != verify) {
                throw new Error("Just admin can insert products")
            }

            expect(result).toBeUndefined()
        } catch(error: any) {
            throw new Error(error.message)
        }
    })
})

describe("Get Products test", () => {
    test("Return when getProduct is correct", async () => {
        expect.assertions
        try{
            const result = await productBusinessMock.getProducts("")

            expect(result).toBeDefined()
        } catch(error: any) {
            throw new Error(error.message)
        }
    })
})

describe("Edit Product Price test", () => {
    test("Return when authorization is missing", async () => {
        expect.assertions
        try{
            const result = await productBusinessMock.editPrice("", 5000, "mocked_productId")

            expect(result).toThrowError()
        } catch(error: any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test("Return when price is missing", async () => {
        expect.assertions
        try{
            const result = await productBusinessMock.editPrice("mocked_token", "" as any, "mocked_productId")

            expect(result).toThrowError()
        } catch(error: any) {
            expect(error.message).toEqual("Enter a price")
        }
    })

    test("Return when user is not an admin", async () => {
        expect.assertions
        try{
            const token = "mocked_aidi"
            const result = await productBusinessMock.editPrice(token, 5000, "mocked_productId")

            const admin = userMock.getId()

            if (token != admin) {
                throw new Error("Just administrator can edit the price")
            }

            expect(result).toThrowError()
        } catch(error: any) {
            expect(error.message).toEqual("Just administrator can edit the price")
        }
    })

    test("Return when editPrice is correct", async () => {
        expect.assertions
        try{
            const token = "mocked_id"
            const result = await productBusinessMock.editPrice(token, 5000, "mocked_productId")

            const admin = userMock.getId()

            if (token != admin) {
                throw new Error("Just administrator can edit the price")
            }

            expect(result).toBeUndefined()
        } catch(error: any) {
            expect(error.message).toEqual("Just administrator can edit the price")
        }
    })
})

describe("Delete Product test", () => {
    test("Return when authorization is missing", async () => {
        expect.assertions   
        try{
            const result = await productBusinessMock.deleteProduct("", "product_id")

            expect(result).toThrowError()
        } catch(error: any) {
            expect(error.message).toEqual("Login first")
        }
    })

    test("Return when productId is missing", async () => {
        expect.assertions
        try{
            const result = await productBusinessMock.deleteProduct("mocked_token", "")

            expect(result).toThrowError()
        } catch(error: any) {
            expect(error.message).toEqual("Enter a product id")
        }
    })

    test("Return when user is not an admin", async () => {
        expect.assertions
        try{
            const token = "mocked_aidi"
            const result = await productBusinessMock.deleteProduct(token, "product_id")

            const admin = userMock.getId()

            if (token != admin) {
                throw new Error("Just administrator can edit the price")
            }

            expect(result).toThrowError()
        } catch(error: any) {
            expect(error.message).toEqual("Just administrator can edit the price")
        }
    })

    test("Return when editPrice is correct", async () => {
        expect.assertions
        try{
            const token = "mocked_id"
            const result = await productBusinessMock.deleteProduct(token, "mocked_productId")

            const admin = userMock.getId()

            expect(token).toEqual(admin)
            expect(result).toBeUndefined()
        } catch(error: any) {
            throw new Error(error.message)
        }
    })
})

