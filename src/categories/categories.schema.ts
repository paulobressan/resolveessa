import * as joi from 'joi';

export const CategoriesSchemaSave: joi.Schema = joi.object().keys({
    name: joi.string().required().min(3).max(250),
    description: joi.string().max(500),
    urlImage: joi.string().max(500),
    subCategories: joi.object({
        name: joi.string().required().min(3).max(250),
        description: joi.string().max(500),
        urlImage: joi.string().max(500),
        isAtivo: joi.boolean()
    }),
    isAtivo: joi.boolean()
});