import { CardData } from "../data/CardData"
import { Card } from "../models/Card"
import { Authenticator } from "../services/Authenticator"
import { verifyDate } from "../services/Date"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class CardBusiness {
    constructor (
        private authenticator: Authenticator,
        private hashManager: HashManager,
        private idGenerator: IdGenerator,
        private cardData: CardData,
    ) {}
    
    createCard = async(name: string, number: string, cvv: string, validationDate: Date, token: string) => {
        if(!name) {
            throw new Error("Enter a name")
        }
        if(!number) {
            throw new Error("Enter a card number")
        } else if (number.length != 16) {
            throw new Error("Invalid card number. The card must contain 16 characters")
        }
        if(!cvv) {
            throw new Error("Enter a cvv")
        } else if (cvv.length != 3) {
            throw new Error("Invalid cvv. The cvv must contain 3 characters")
        }
        if(!validationDate) {
            throw new Error("Enter a validation date")
        }

        const isInvalid = await verifyDate(validationDate)
        if(isInvalid) {
            throw new Error("Invalid Date")
        }

        if(!token) {
            throw new Error("Login first")
        }
        const userId = this.authenticator.getTokenData(token)
        const cardExist = await this.cardData.validateCard(number, userId.id)

        if(cardExist) {
            throw new Error("Card already registered")
        }

        const id = this.idGenerator.generateId()
        const cypherCvv = await this.hashManager.generateHash(cvv)

        await this.cardData.createCard(
            new Card(
                id,
                name,
                number,
                cypherCvv,
                validationDate,
                userId
            )
        )
    }

    getAllCards = async(token: string) => {
        if(!token) {
            throw new Error("Login first")
        }

        const userId = this.authenticator.getTokenData(token)

        const response = await this.cardData.getAllCards(userId.id)

        return response
    }

    deleteCard = async(token: string, cardId: string) => {
        if(!token) {
            throw new Error("Login first")
        }
        if(!cardId) {
            throw new Error("Enter a card id")
        }

        const response = await this.cardData.deleteCard(cardId)
    }
}
