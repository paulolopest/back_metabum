"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const Classes_1 = require("../models/Classes");
class UserBusiness {
    constructor() {
        this.signup = (name, email, cpf, password) => __awaiter(this, void 0, void 0, function* () {
            if (!name) {
                throw new Error("Enter a name");
            }
            if (!email) {
                throw new Error("Enter an email");
            }
            else if (email.indexOf("@") === -1) {
                throw new Error("The email must contain an @");
            }
            const user = yield Classes_1.userData.getUserByEmail(email);
            if (user) {
                throw new Error("User already exist");
            }
            if (!cpf) {
                throw new Error("Enter a CPF");
            }
            const cpfVerify = yield Classes_1.userData.getUserByCpf(cpf);
            if (cpfVerify) {
                throw new Error("The cpf is already registered");
            }
            if (cpf.length != 11) {
                throw new Error("The CPF must be longer than 11 characters");
            }
            if (!password) {
                throw new Error("Enter a password");
            }
            else if (password.length < 6) {
                throw new Error("The password must be longer than 6 characteres");
            }
            const id = Classes_1.idGenerator.generateId();
            const cypherPassword = yield Classes_1.hashManager.generateHash(password);
            yield Classes_1.userData.signup({
                id: id,
                name: name,
                email: email,
                cpf: cpf,
                password: cypherPassword
            });
            const token = Classes_1.authenticator.generateToken({ id: id });
            return token;
        });
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                throw new Error("Enter a email");
            }
            if (!password) {
                throw new Error("Invalid password");
            }
            else if (password.length < 6) {
                throw new Error("Invalid password");
            }
            const user = yield Classes_1.userData.getUserByEmail(email);
            if (!user) {
                throw new Error("Account does not exist");
            }
            const validatePassword = yield Classes_1.hashManager.compareHash(password, user.password);
            if (!validatePassword) {
                throw new Error("Incorrect password");
            }
            const token = Classes_1.authenticator.generateToken({ id: user.id });
            return token;
        });
        this.getProfile = (token) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            const userId = Classes_1.authenticator.getTokenData(token);
            const response = yield Classes_1.userData.getProfile(userId.id);
            return response;
        });
        this.editProfileName = (token, name) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            if (!name) {
                throw new Error("Enter a name");
            }
            const userId = Classes_1.authenticator.getTokenData(token);
            yield Classes_1.userData.editProfileName(userId.id, name);
        });
        this.deleteUser = (token) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            const userId = Classes_1.authenticator.getTokenData(token);
            const response = yield Classes_1.userData.deleteUser(userId.id);
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map