const Joi = require('joi');

const validateBookData = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(100).max(1000).required(),
  }) 

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = { validateBookData };
