"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
exports.CategoriesSchemaSave = joi.object().keys({
    name: joi.string().required().min(3).max(250),
    description: joi.string().max(500),
    urlImage: joi.string().uri().max(500),
    subCategories: joi.object({
        name: joi.string().required().min(3).max(250),
        description: joi.string().max(500),
        urlImage: joi.string().uri().max(500),
        isAtivo: joi.boolean()
    }),
    isAtivo: joi.boolean()
});
//# sourceMappingURL=categories.schema.js.map