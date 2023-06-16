"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE = exports.User = void 0;
class User {
    constructor(id, name, email, password, cpf, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.cpf = cpf;
        this.role = role;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getCpf() {
        return this.cpf;
    }
    getRole() {
        return this.role;
    }
}
exports.User = User;
var ROLE;
(function (ROLE) {
    ROLE["NORMAL"] = "Normal";
    ROLE["ADMIN"] = "Administrator";
})(ROLE = exports.ROLE || (exports.ROLE = {}));
//# sourceMappingURL=User.js.map