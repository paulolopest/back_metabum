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
exports.UserController = void 0;
const Classes_1 = require("../models/Classes");
class UserController {
    constructor() {
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, cpf, password } = req.body;
                const response = yield Classes_1.userBusiness.signup(name, email, cpf, password);
                res.status(201).send(response);
            }
            catch (error) {
                res.status(500).send(error.message || error.sqlMessage);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield Classes_1.userBusiness.login(email, password);
                res.status(200).send(response);
            }
            catch (error) {
                res.status(500).send(error.message || error.sqlMessage);
            }
        });
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const response = yield Classes_1.userBusiness.getProfile(token);
                res.send(response);
            }
            catch (error) {
                res.status(500).send(error.message || error.sqlMessage);
            }
        });
        this.editProfileName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { name } = req.body;
                const response = yield Classes_1.userBusiness.editProfileName(token, name);
                res.send(`Name successfully update for ${name}`);
            }
            catch (error) {
                res.status(500).send(error.message || error.sqlMessage);
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const response = yield Classes_1.userBusiness.deleteUser(token);
                res.send("User deleted");
            }
            catch (error) {
                res.status(500).send(error.message || error.sqlMessage);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map