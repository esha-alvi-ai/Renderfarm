const Joi = require("joi");

exports.validateCreateJob = (req, res, next) => {
  const schema = Joi.object({
    storageLocation: Joi.string().required(),
    compName: Joi.string().required(),
    startFrame: Joi.number().default(0),
    endFrame: Joi.number().required(),
    chunkSize: Joi.number().default(30)
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).json({
      error: result.error.details[0].message
    });
  }

  next();
};
