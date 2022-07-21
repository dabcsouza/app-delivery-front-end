import loginSchema from '../schemas/loginSchema';

const validateLogin = (data) => {
  const validate = loginSchema.validate(data);

  if (typeof validate.error !== 'undefined') return false;

  return true;
};

export default validateLogin;
