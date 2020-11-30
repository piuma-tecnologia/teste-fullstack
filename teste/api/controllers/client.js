const fs = require('fs')
const validator = require('../util/validator')
const messages = require('../util/messages')
const fileData = 'database/client.json'
const data = require('./../database/client.json')

const getClients = async (req, reply) => {
  if (data) {
    reply.send(data)
  }
}

const getClientById = async (req, reply) => {
  if (data) {
    const client = JSON.parse(data).filter( item => {
      return item.id === Number(req.params.id)
    })
    if (!validator.validateNotFoundException(client)) {
      reply.send(messages.clientNotFoundMessage)
    }
    reply.send(client[0])
  }
}

const addClient = async (req, reply) => {
  let newData = data
  const newID = newData.length > 0 ? (newData[newData.length - 1].id + 1) : 1
  documento = req.body.documento
  newData.push({
    "id": newID,
    "nome": req.body.nome,
    "apelido": req.body.apelido,
    "documento": documento.replace(/\D/g, '')
  })
  fs.writeFileSync(fileData, JSON.stringify(newData));
  reply.send(newData)
}

const updateClient = async (req, reply) => {
  const client = data.filter( item => {
    return item.id === Number(req.params.id)
  })

  if (!validator.validateNotFoundException(client)) {
    reply.send(messages.clientNotFoundMessage)
  }

  client[0].nome = req.body.nome
  client[0].apelido = req.body.apelido
  client[0].documento = req.body.documento
  const newData = data.map( item => {
    if (Number(item.id) === Number(client[0].id)) {
      return item = client[0]
    }
    return item
  })
  fs.writeFileSync(fileData, JSON.stringify(newData));
  reply.send(newData)
}

const deleteClient = async (req, reply) => {
  const id = Number(req.params.id)

  const client = data.filter( item => {
    return item.id === id
  })

  if (!validator.validateNotFoundException(client)) {
    reply.send(messages.clientNotFoundMessage)
  }

  clients = data.filter( item => {
    return item.id !== id
  })
  fs.writeFileSync(fileData, JSON.stringify(clients));
  reply.send(clients)
}

  module.exports = {
    getClients,
    getClientById,
    addClient,
    updateClient,
    deleteClient
  }