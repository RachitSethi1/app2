// /middleware/validationSchemas.js

const Joi = require('joi').extend(require('@joi/date'));

module.exports.userSchema = Joi.object({
	username: Joi.string().min(3).max(20).required(),
	password: Joi.string().min(3).max(20).required(),
	name: Joi.string().min(3).max(40).required(),
	mobile: Joi.string().length(10).regex(/^[0-9]{10}$/).required()
});

module.exports.locationSchema = Joi.object({
	society: Joi.string().valid('CHD', 'JMD').required(),
	tower: Joi.string().regex(/^(T(1[0-8]|[1-9])|[A-Q])$/).required(),
	flat: Joi.string().regex(/^((0|1[0-2]?)0[1-6]|(1[0-8]|[1-9])0[1-2])$/).required()
});

module.exports.bookingSchema = Joi.object({
	date: Joi.date().format('YYYY-MM-DD').raw().required(),
	time: Joi.string().valid('10 am', '12 pm', '2 pm', '4 pm').required(),
	service: Joi.string().required()
});
