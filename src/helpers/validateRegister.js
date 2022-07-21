import registerSchema from '../schemas/registerSchema';

const validateRegister = (data) => {
  const validate = registerSchema.validate(data);

  if (typeof validate.error !== 'undefined') return false;

  return true;
};

export default validateRegister;
