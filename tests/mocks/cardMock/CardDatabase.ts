import { Card } from "../../../src/models/Card";
import { cardMock } from "./CardMock";


export class CardDatabaseMock {
    public createCard = async(card: Card) => {}

    public selectCardByNumber = async(number: string) => {
        if(number === "1234567891098765") {
            return cardMock
        } else {
            return undefined
        }
    }

    public validateCard = async(number: string, id: string) => {
        if(number === "1234567891098765" && id === "mocked_id") {
            return cardMock
        } else {
            return undefined
        }
    }

    public getAllCards = async(userId: string) => {
        if(userId = "mocked_userId") {
            return cardMock
        } else {
            return undefined
        }
    }

    public deleteCard = async(token: string, cardId: string) => {}
}