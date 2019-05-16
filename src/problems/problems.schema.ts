import * as joi from 'joi';

export const ProblemSchemaSave: joi.Schema = joi.object().keys({
    user: joi.string().required(),
    subCategory: joi.string().required(),
    observation: joi.string().max(500),
    latitude: joi.string().max(50),
    longitude: joi.string().max(50),
    isAtivo: joi.boolean()
});