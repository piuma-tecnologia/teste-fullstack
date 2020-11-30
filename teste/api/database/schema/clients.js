const bodyJsonSchema = {
  type: 'object',
  required: ['nome', 'apelido', 'documento'],
  properties: {
    id: {type: ['number', 'null']},
    nome: { type: 'string' },
    apelido: { type: 'string' },
    documento: { type: 'string' },
  }
}

const clientSchema = {
  body: bodyJsonSchema
}

module.exports = {
  clientSchema
}