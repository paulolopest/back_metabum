import {Request, Response} from "express"
import { CardBusiness } from "../business/CardBusiness"

export class CardController {
    constructor(
        private cardBusiness: CardBusiness
    ) {}

    createCard = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const {name, number, cvv, validationDate} = req.body
            const response = await this.cardBusiness.createCard(name, number, cvv, validationDate, token)

            res.status(201).send("The card was successfully registered")
        } catch(error:any) {
            res.send(error.message || error.sqlMessage)
        }
    }

    getAllCards = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const response = await this.cardBusiness.getAllCards(token)

            res.status(201).send(response)
        } catch (error:any) {
            res.send(error.message || error.sqlMessage)
        }
    }

    deleteCard = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const cardId = req.params.cardId
            const response = await this.cardBusiness.deleteCard(token, cardId)

            res.send("Card deleted")
        } catch(error:any) {
            res.send(error.message || error.sqlMessage)
        }
    }
}

