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
exports.UserDatabaseMock = void 0;
const UserMock_1 = require("./UserMock");
class UserDatabaseMock {
    constructor() {
        this.signup = (user) => __awaiter(this, void 0, void 0, function* () { });
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            if (email === "paulo@gmail.com") {
                return UserMock_1.userMock;
            }
            else {
                undefined;
            }
        });
        this.getUserByCpf = (cpf) => __awaiter(this, void 0, void 0, function* () {
            if (cpf === "12345678910") {
                return UserMock_1.userMock;
            }
            else {
                return undefined;
            }
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            if (id === "mocked_id") {
                return UserMock_1.userMock;
            }
            else {
                return undefined;
            }
        });
        this.getProfile = (id) => __awaiter(this, void 0, void 0, function* () {
            if (id === "mocked_id") {
                return UserMock_1.userMock;
            }
            else {
                return undefined;
            }
        });
        this.editProfileName = (token, name) => __awaiter(this, void 0, void 0, function* () {
            if (token === "mocked_token") {
                return `Name changed to ${name}`;
            }
            else {
                return undefined;
            }
        });
        this.deleteUser = (token) => __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.UserDatabaseMock = UserDatabaseMock;
//# sourceMappingURL=UserDatabaseMock.js.map