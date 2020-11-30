import { httpClient } from './httpClient'

export const getClients = () => {
    return httpClient.get('/clients')
}

export const getClient = () => {
    return httpClient.get('/clients')
}

export const createClient = client => {
    return httpClient.post('/clients', client)
}

export const updateClient = (id, client) => {
    return httpClient.put(`/clients/${id}`, client)
}

export const deleteClient = id => {
    return httpClient.delete(`/clients/${id}`)
}