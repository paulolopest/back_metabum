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
exports.UserData = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserData extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.signup = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection("metabum_users")
                    .insert({
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    cpf: user.getCpf()
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("metabum_users")
                    .where({ email: email });
                return response[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getUserByCpf = (cpf) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("metabum_users")
                    .where({ cpf: cpf });
                return response[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("metabum_users")
                    .where({ id: id });
                return response[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getProfile = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("metabum_users")
                    .where({ id: id });
                return response;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.editProfileName = (userId, name) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("metabum_users")
                    .update({ name: name })
                    .where({ id: userId });
                return response;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.deleteUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.connection("metabum_users")
                    .delete()
                    .where({ id: userId });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.UserData = UserData;
//# sourceMappingURL=UserData.js.map