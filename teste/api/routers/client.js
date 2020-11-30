const clientController = require('../controllers/client')
const schema = require('../database/schema/clients')

const routes = [
    {
        method: 'GET',
        url: '/api/clients',
        handler: clientController.getClients
    },
    {
        method: 'GET',
        url: '/api/clients/:id',
        handler: clientController.getClientById
    },
    {
        method: 'POST',
        url: '/api/clients',
        schema: schema.clientSchema,
        handler: clientController.addClient
    },
    {
        method: 'PUT',
        url: '/api/clients/:id',
        schema: schema.clientSchema,
        handler: clientController.updateClient
    },
    {
        method: 'DELETE',
        url: '/api/clients/:id',
        handler: clientController.deleteClient
    }
]

module.exports = routes;