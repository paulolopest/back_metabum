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
const User_1 = require("../models/User");
class UserBusiness {
    constructor(authenticator, hashManager, idGenerator, userData) {
        this.authenticator = authenticator;
        this.hashManager = hashManager;
        this.idGenerator = idGenerator;
        this.userData = userData;
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
            const user = yield this.userData.getUserByEmail(email);
            if (user) {
                throw new Error("User already exist");
            }
            if (!cpf) {
                throw new Error("Enter a CPF");
            }
            if (cpf.length != 11) {
                throw new Error("The CPF must be equal 11 characters");
            }
            const cpfVerify = yield this.userData.getUserByCpf(cpf);
            if (cpfVerify) {
                throw new Error("The cpf is already registered");
            }
            if (!password) {
                throw new Error("Enter a password");
            }
            else if (password.length < 6) {
                throw new Error("The password must be longer than 6 characteres");
            }
            const id = this.idGenerator.generateId();
            const cypherPassword = yield this.hashManager.generateHash(password);
            yield this.userData.signup(new User_1.User(id, name, email, cypherPassword, cpf, "Normal"));
            const token = this.authenticator.generateToken({ id: id });
            return token;
        });
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                throw new Error("Enter an email");
            }
            if (!password) {
                throw new Error("Invalid password");
            }
            else if (password.length < 6) {
                throw new Error("Invalid password");
            }
            const user = yield this.userData.getUserByEmail(email);
            if (!user) {
                throw new Error("Account does not exist");
            }
            const validatePassword = yield this.hashManager.compareHash(password, user.password);
            if (!validatePassword) {
                throw new Error("Incorrect password");
            }
            const token = this.authenticator.generateToken({ id: user.id });
            return token;
        });
        this.getProfile = (token) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            const userId = this.authenticator.getTokenData(token);
            const response = yield this.userData.getProfile(userId.id);
            return response;
        });
        this.editProfileName = (token, name) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            if (!name) {
                throw new Error("Enter a name");
            }
            const userId = this.authenticator.getTokenData(token);
            const response = yield this.userData.editProfileName(userId.id, name);
        });
        this.deleteUser = (token) => __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error("Login first");
            }
            const userId = this.authenticator.getTokenData(token);
            const response = yield this.userData.deleteUser(userId.id);
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map