"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
exports.ProblemSchemaSave = joi.object().keys({
    user: joi.string().required(),
    subCategory: joi.string().required(),
    observation: joi.string().max(500),
    latitude: joi.string().max(50),
    longitude: joi.string().max(50),
    isAtivo: joi.boolean()
});
//# sourceMappingURL=problems.schema.js.map