"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class BaseDatabase {
    constructor() {
        this.connection = (0, knex_1.default)({
            client: 'mysql',
            connection: {
                host: "35.226.146.116",
                user: "21712944-paulo-lopes",
                password: "rSkTJ4uk#%xnHhzyR6Zf",
                database: "vaughan-21712944-paulo-lopes",
                port: 3306,
                multipleStatements: true
            }
        });
    }
}
exports.BaseDatabase = BaseDatabase;
//# sourceMappingURL=BaseDatabase.js.map