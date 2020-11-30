<template>
    <div class="q-pa-md flex flex-center">
        <div class="q-gutter-md" style="max-width: 300px">
            <q-form
                @submit="submitForm">
                <q-input v-model="client.nome" label="Nome"></q-input>
                <q-input v-model="client.apelido" label="Apelido"></q-input>
                <div class="row">
                    <q-btn class="q-ma-md" color="primary" :label="tipoDocumento === 'cpf' ? 'CPF' : 'CNPJ'"
                        @click="setDocumento"/>
                    <q-input v-model="client.documento" label="Documento"
                        :mask="tipoDocumento === 'cpf' ? '###.###.###-##' : '##.###.###/####-##'"></q-input>
                </div>
                <div class="form-actions flex flex-center">
                    <q-btn outline color="primary" label="Cancel"
                        @click="cancelForm"/>
                    <q-btn unelevated color="primary" :label="this.mode === 'edit' ? 'Update Client' : 'Add Client'"
                        type="submit"/>
                </div>
            </q-form>
        </div>
    </div>
</template>

<script>
import { createClient, updateClient } from './../../services/clientService'
import { Notify } from 'quasar'

export default {
    name: 'ClientForm',
    props: ['mode', 'editClients'],
    watch: {
        mode: function (newVal) {
            if (newVal === 'create') {
                this.$emit('clearSelections')

                setTimeout(() => {
                    this.clearForm()
                },100)
            }
        },
        editClients: function (newVal, oldVal) {
            if (this.mode === 'edit' && newVal) {
                this.tipoDocumento = newVal.documento.length === 11 ? 'cpf': 'cnpj'
                
                setTimeout(() => {
                    this.client.documento = newVal.documento
                },100)

                this.client.nome = newVal.nome
                this.client.apelido = newVal.apelido
            } else {
                this.client = oldVal
            }
        }
    },
    methods: {
        submitForm() {
            if (this.client.nome.length < 1) {
                return Notify.create({
                        type: 'warning',
                        color: 'warning',
                        timeout: 2000,
                        position: 'top-right',
                        message: `Client nome must have at least 1 char`
                    })
            } else if (this.client.apelido.length < 1) {
                return Notify.create({
                        type: 'warning',
                        color: 'warning',
                        timeout: 2000,
                        position: 'top-right',
                        message: `Client Apelido must have at least 1 char`
                    })
            } else if (this.tipoDocumento === 'cpf' && this.client.documento.length < 11) {
                return Notify.create({
                        type: 'warning',
                        color: 'warning',
                        timeout: 2000,
                        position: 'top-right',
                        message: `Client CPF must have 14 numbers`
                    })
            } else if (this.tipoDocumento === 'cnpj' && this.client.documento.length < 14) {
                return Notify.create({
                        type: 'warning',
                        color: 'warning',
                        timeout: 2000,
                        position: 'top-right',
                        message: `Client CPF must have 14 numbers`
                    })
            }
            if (this.mode === 'edit') {
                this.updateClient()
            } else {
                this.createClient()
            }
            
        },
        createClient() {
            createClient(this.client).then( response => {
                if (response.status === 200) {
                    this.clearForm()
                    this.$emit('updateClients', response.data)
                    Notify.create({
                        type: 'positive',
                        color: 'positive',
                        timeout: 2000,
                        position: 'top-right',
                        message: `Client saved Successfully`
                    })
                } else {
                    Notify.create({
                        type: 'warning',
                        color: 'warning',
                        timeout: 2000,
                        position: 'top-right',
                        message: `${response.status} status occurred`
                    })
                }
            }).catch( err => {
                console.log(err)
            })
        },
        validateInput() {
            if (this.client.nome.length < 3) {
                return Notify.create({
                        type: 'warning',
                        color: 'warning',
                        timeout: 2000,
                        position: 'top-right',
                        message: `Client nome must have more than 3 chars`
                    })
            } else if (this.client.apelido.length < 3) {
                return Notify.create({
                        type: 'warning',
                        color: 'warning',
                        timeout: 2000,
                        position: 'top-right',
                        message: `Client Apelido must have more than 3 chars`
                    })
            } else if (this.tipoDocumento === 'cpf' && this.client.documento.length < 11) {
                return Notify.create({
                        type: 'warning',
                        color: 'warning',
                        timeout: 2000,
                        position: 'top-right',
                        message: `Client CPF must have 11 numbers`
                    })
            } else if (this.tipoDocumento === 'cnpj' && this.client.documento.length < 14) {
                return Notify.create({
                        type: 'warning',
                        color: 'warning',
                        timeout: 2000,
                        position: 'top-right',
                        message: `Client CNPJ must have 14 numbers`
                    })
            }
        },
        updateClient() {
            updateClient(this.editClients.id, this.client).then( response => {
                if (response.status === 200) {
                    Notify.create({
                        type: 'positive',
                        color: 'positive',
                        timeout: 2000,
                        position: 'top-right',
                        message: `Client #${this.editClients.id} updated Successfully`
                    })
                    this.$emit('updateClients', response.data)
                }
            })
        },
        cancelForm() {
            this.clearForm()
            this.$emit('closeForm', false)
        },
        clearForm() {
            this.client = {
                nome: '',
                apelido: '',
                documento: ''
            }
        },
        setDocumento() {
            if (this.tipoDocumento === 'cpf') {
                this.client.documento = ''
                this.tipoDocumento = 'cnpj'
            } else {
                this.client.documento = ''
                this.tipoDocumento = 'cpf'
            }
        }
    },
    data() {
        return {
            tipoDocumento: 'cpf',
            client: {
                nome: '',
                apelido: '',
                documento: ''
            }
        }
    }
}
</script>

<style scoped>
    .form-actions button{
        margin: 20px 10px;
    }
</style>