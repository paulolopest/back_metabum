import { AuthenticationData } from "./AuthenticationData"

export class Card {
    constructor (
        private id: string,
        private name: string,
        private number: string,
        private cvv: string,
        private validationDate: Date,
        private userId: AuthenticationData
    ) {}

    public getId(): string {
        return this.id
    }
    public getName(): string {
        return this.name
    }
    public getNumber(): string {
        return this.number
    }
    public getCvv(): string {
        return this.cvv
    }
    public getValidationDate(): Date {
        return this.validationDate
    }
    public getUserId(): AuthenticationData {
        return this.userId
    }
}

