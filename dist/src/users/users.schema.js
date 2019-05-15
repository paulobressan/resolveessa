"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
exports.UsersSchemaSave = joi.object().keys({
    name: joi.string().required().min(3).max(80),
    fone: joi.string().required().min(11).max(20),
    email: joi.string().email().min(6).max(255),
    isEmail: joi.boolean(),
    password: joi.string().required().min(8),
});
//# sourceMappingURL=users.schema.js.map