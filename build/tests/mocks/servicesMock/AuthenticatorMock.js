"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatorMock = void 0;
class AuthenticatorMock {
    constructor() {
        this.generateToken = (id) => {
            return "mocked_token";
        };
        this.getTokenData = (token) => {
            return { id: "mocked_id" };
        };
    }
}
exports.AuthenticatorMock = AuthenticatorMock;
//# sourceMappingURL=AuthenticatorMock.js.map