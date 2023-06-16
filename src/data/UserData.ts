import { User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserData extends BaseDatabase {
    signup = async (user: User) => {
        try {
            await this.connection("metabum_users")
            .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                cpf: user.getCpf()
            })
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getUserByEmail = async(email: string) => {
        try {
            const response = await this.connection("metabum_users")
            .where({email: email})

            return response[0]
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    getUserByCpf = async(cpf: string) => {
        try {
            const response = await this.connection("metabum_users")
            .where({cpf: cpf})

            return response[0]
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    getUserById = async(id: string) => {
        try {
            const response = await this.connection("metabum_users")
            .where({id: id})

            return response[0]
        }catch (error: any) {
            throw new Error(error.message)
        }
    }

    getProfile = async(id: string) => {
        try {
            const response = await this.connection("metabum_users")
            .where({id: id})

            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    editProfileName = async(userId: string, name: string) => {
        try {
            const response = await this.connection("metabum_users")
            .update({name: name})
            .where({id: userId})

            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    deleteUser = async(userId: string) => {
        try {
            const response = await this.connection("metabum_users")
            .delete()
            .where({id: userId})

        }catch (error: any) {
            throw new Error(error.message)
        }
    }
}