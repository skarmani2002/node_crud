const ValidationMiddleware = require('../helpers/validation-middleware');
const Joi = require("joi");

const validations = {
    login: Joi.compile({
        username: Joi.string().required(),
        password: Joi.string().required(),
        relay_state: Joi.string(),
        api_version: Joi.string().optional(),
    }),
    register: Joi.compile({
            first_name: Joi.string().max(50),
            last_name: Joi.string().max(50),
            email: Joi.string().email().required(),
            gender: Joi.string().valid(['m', 'f']),
            phone: Joi.string().optional().allow(null),
            password : Joi.string().required(),
            device_id: Joi.string().allow(null),
            device_type: Joi.string().required(),
    }),
};
module.exports = (req, res, next) => {
    ValidationMiddleware(req, res, next, validations);
};
