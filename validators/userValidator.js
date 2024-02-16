const Joi = require('joi');

// validate signup
const signupValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required(),
    role: Joi.string().valid('RetailUser', 'Admin', 'Author').required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ statuscode: 400, message: error.message });
  }

  next();
};

// validate login
const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ statuscode: 400, message: error.message });
  }

  next();
};

module.exports = { signupValidator, loginValidator };
