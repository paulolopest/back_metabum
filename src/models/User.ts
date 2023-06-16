import { AuthenticationData } from "./AuthenticationData"

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private cpf: string,
        private role: string
    ){}

    public getId(): string {
        return this.id
    }
    
    public getName(): string {
        return this.name
    }

    public getEmail(): string {
        return this.email
    }

    public getPassword(): string {
        return this.password
    }

    public getCpf(): string {
        return this.cpf
    }

    public getRole(): string {
        return this.role
    }
}

export enum ROLE {
    NORMAL = "Normal",
    ADMIN = "Administrator"
}