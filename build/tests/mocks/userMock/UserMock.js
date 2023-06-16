"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMock2 = exports.userMock = void 0;
const User_1 = require("../../../src/models/User");
exports.userMock = new User_1.User("mocked_id", "Paulo", "paulo@gmail.com", "paulo123", "12345678910", "Administrator");
exports.userMock2 = new User_1.User("id_mockado", "flavio", "flavio@lab.com", "flavio123", "01987654321", "Normal");
//# sourceMappingURL=UserMock.js.map