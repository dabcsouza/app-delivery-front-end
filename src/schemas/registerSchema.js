import joi from 'joi';

const MIN_NUM_PASSWORD = 6;
const MIN_LENGTH_NAME = 12;

const registerSchema = joi.object({
  email: joi.string().email({ tlds: { allow: false } }).required(),
  name: joi.string().min(MIN_LENGTH_NAME).required(),
  password: joi.string().min(MIN_NUM_PASSWORD).required(),

});

export default registerSchema;
