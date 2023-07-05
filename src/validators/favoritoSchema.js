const Joi = require('joi')

const favoritoSchema = Joi.object().keys({
  idUser: Joi.string().required(),
  idTaller: Joi.string().required(),
})


module.exports = {
    favoritoSchema
}