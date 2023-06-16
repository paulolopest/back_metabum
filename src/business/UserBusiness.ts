import { UserData } from "../data/UserData"
import { User } from "../models/User"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class UserBusiness {
    constructor (
        private authenticator: Authenticator,
        private hashManager: HashManager,
        private idGenerator: IdGenerator,
        private userData: UserData,
    ) {}

    signup = async(name: string, email: string, cpf: string, password: string) => {
        if(!name) {
            throw new Error("Enter a name")
        }
        if(!email) {
            throw new Error("Enter an email")
        } else if (email.indexOf("@") === -1) {
            throw new Error("The email must contain an @")
        }

        const user = await this.userData.getUserByEmail(email)
        if(user) {
            throw new Error("User already exist")
        }

        if(!cpf) {
            throw new Error("Enter a CPF")
        }

        if(cpf.length != 11) {
            throw new Error("The CPF must be equal 11 characters")
        }

        const cpfVerify = await this.userData.getUserByCpf(cpf)
        if(cpfVerify) {
            throw new Error("The cpf is already registered")
        }
        
        if(!password) {
            throw new Error("Enter a password")
        } else if (password.length < 6) {
            throw new Error("The password must be longer than 6 characteres")
        }

        const id: string = this.idGenerator.generateId()
        const cypherPassword = await this.hashManager.generateHash(password)

        await this.userData.signup(
            new User(id, name, email, cypherPassword, cpf, "Normal")
        )

        const token = this.authenticator.generateToken({id: id})

        return token
    }

    login = async(email: string, password: string) => {
        if(!email) {
            throw new Error("Enter an email")
        }
        if(!password) {
            throw new Error("Invalid password")
        } else if (password.length < 6) {
            throw new Error("Invalid password")
        }

        const user = await this.userData.getUserByEmail(email)
        if(!user) {
            throw new Error("Account does not exist")
        }

        const validatePassword = await this.hashManager.compareHash(password, user.password)
        if(!validatePassword) {
            throw new Error("Incorrect password")
        }

        const token = this.authenticator.generateToken({id: user.id})

        return token
    }

    getProfile = async(token: string): Promise<string[]> => {
        if(!token) {
            throw new Error("Login first")
        }
        const userId = this.authenticator.getTokenData(token)

        const response = await this.userData.getProfile(userId.id)

        return response
    }

    editProfileName = async(token: string, name: string) => {
        if(!token) {
            throw new Error("Login first")
        }
        if(!name) {
            throw new Error("Enter a name")
        }

        const userId = this.authenticator.getTokenData(token)

        const response = await this.userData.editProfileName(userId.id, name)
    }

    deleteUser = async(token: string) => {
        if(!token) {
            throw new Error("Login first")
        }

        const userId = this.authenticator.getTokenData(token)

        const response = await this.userData.deleteUser(userId.id)
    }
}