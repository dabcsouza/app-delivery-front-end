import joi from 'joi';

const MIN_NUM_PASSWORD = 6;

const loginSchema = joi.object({
  email: joi.string().email({ tlds: { allow: false } }).required(),
  password: joi.string().min(MIN_NUM_PASSWORD).required(),
});

export default loginSchema;
