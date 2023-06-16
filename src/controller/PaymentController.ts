import { Request, Response } from "express";
import { PaymentBusiness } from "../business/PaymentBusiness";

export class PaymentController {
  constructor (
    private paymentBusiness: PaymentBusiness
  ){}

  creditPayment = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const productId = req.params.productId;
      const { cardNumber, cvv, cardName, cardValidation } = req.body;

      const response = await this.paymentBusiness.creditPayment(cardNumber, cvv, cardName, token, productId, cardValidation);

      res.send("Purchase made");
    } catch (error: any) {
      res.send(error.message || error.sqlMessage);
    }
  }

  boletoPayment = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const productId = req.params.productId

      const response = await this.paymentBusiness.boletoPayment(token, productId)

      res.send("Purchase made")
    } catch (error: any) {
      res.send(error.message || error.sqlMessage);
    }
  }

  getBoletoPayment = async(req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const response = await this.paymentBusiness.getBoletoPayment(token)

      res.send(response)
    }catch (error: any) {
      res.send(error.message || error.sqlMessage);
    }
  }
  getCardPayment = async(req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const response = await this.paymentBusiness.getCardPayment(token)

      res.send(response)
    }catch (error: any) {
      res.send(error.message || error.sqlMessage);
    }
  }

}
