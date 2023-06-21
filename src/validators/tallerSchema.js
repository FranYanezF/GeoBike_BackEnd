//todo: REVISAR ESTA VALIDACION

const Joi = require('joi');

const tallerCreationSchema = Joi.object({
  type: Joi.string().required(),
  geometry: Joi.object({
    type: Joi.string().required(),
    coordinates: Joi.array().items(Joi.number()).required()
  }),
  properties: Joi.object({
    name: Joi.string().required()
  })
});

module.exports = tallerCreationSchema;
