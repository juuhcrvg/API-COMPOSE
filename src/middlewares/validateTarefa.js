const Joi = require('joi');

const schema = Joi.object({
  titulo: Joi.string().min(3).required().messages({
    'string.base': '"titulo" deve ser um texto.',
    'string.min': '"titulo" deve ter pelo menos 3 caracteres.',
    'any.required': '"titulo" é obrigatório.'
  }),
  descricao: Joi.string().required().messages({
    'string.base': '"descricao" deve ser um texto.',
    'any.required': '"descricao" é obrigatória.'
  }),
  concluida: Joi.boolean().required().messages({
    'boolean.base': '"concluida" deve ser verdadeiro ou falso.',
    'any.required': '"concluida" é obrigatória.'
  })
});

function validateTarefa(req, res, next) {
  const { error } = schema.validate(req.body, { abortEarly: false }); // Valida todos os campos
  if (error) {
    return res.status(400).json({ 
      mensagem: 'Dados inválidos.', 
      detalhes: error.details.map(detail => detail.message) // Simplifica os detalhes do erro
    });
  }
  next();
}

module.exports = validateTarefa;