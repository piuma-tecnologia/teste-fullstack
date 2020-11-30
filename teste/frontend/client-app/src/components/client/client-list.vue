<template>
  <q-page class="">
      <div class="q-pa-md">
            <div class="row justify-center toolbar">
                <q-btn class="glossy" round color="primary"
                    :icon="this.searchField ? 'cancel' : 'search'" 
                    @click="setSearchField"/>

                <q-btn class="glossy" round color="amber"
                    :icon="this.editMode && this.showForm && !this.createMode ? 'cancel' : 'edit'" 
                    @click="showClientForm('edit')"/>

                <q-btn class="glossy" round color="red"
                    :icon="!deleteMode ? 'delete' : 'cancel'" 
                    @click="openDeleteMode"/>

                <q-btn class="glossy" round color="secondary"
                    :icon="this.createMode && this.showForm && !this.editMode ? 'cancel': 'add'" 
                    @click="showClientForm('create')"/>
            </div>
            <transition name="fade">
                <ClientForm v-show="this.showForm"
                    @updateClients="getUpdatedClients($event)"
                    @closeForm="closeForm($event)"
                    @clearSelections="resetSelection($event)"
                    :mode="this.editMode ? 'edit' : 'create'"
                    :editClients="this.editMode && this.selection.length > 0 ? this.selection[0] : ''"/>
            </transition>
            <transition name="fade">
                <div v-if="deleteMode" class="flex flex-center delete-button">
                    <q-btn color="red" icon="delete" label="delete selected"
                        @click="deleteSelectedClients"/>
                </div>
            </transition>
            <transition name="fade">
                <div v-if="this.searchField" class="flex flex-center column delete-button">
                    <q-input class="q-my-md" v-model.lazy="searchValue" label="Search Client"></q-input>
                    <div class="row">
                        <q-btn outline class="row q-mx-md" color="primary" icon="search" label="Clear Search"
                            @click="clearSearch"/>
                        <q-btn class="row q-mx-md" color="primary" icon="search" label="Search Client"
                            @click="searchClient"/>
                    </div>
                </div>
            </transition>
            <div class="row justify-center">
                <q-table
                    :dense="$q.screen.lt.md"
                    title="Clients"
                    :data="filteredClients.length > 0 ? filteredClients : clients"
                    :columns="columns"
                    :selection="this.deleteMode || this.editMode ? 'single' : 'none'"
                    :selected.sync="selection"
                    row-key="id"/>
            </div>
      </div>
  </q-page>
</template>

<style>
</style>

<script>
import { getClients, deleteClient } from './../../services/clientService'
import ClientForm from './client-form.vue'
import jsonp from 'jsonp'
import { Notify } from 'quasar'

export default {
    name: 'ClientList',
    components: {
        ClientForm
    },
    beforeMount() {
        getClients().then( response => {
            this.clients = response.data
        })
    },
    data ()  {
        return {
                showForm: false,
                searchField: false,
                createMode: false,
                deleteMode: false,
                editMode: false,
                searchValue: '',
                deleteSelection: 'none',
                selection: [],
                clients: [],
                filteredClients: [],
                columns: [
                    {
                        name: 'id',
                        required: true,
                        label: 'ID',
                        align: 'left',
                        field: 'id',
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'nome',
                        required: true,
                        label: 'Nome',
                        align: 'left',
                        field: 'nome',
                        format: val => `${val}`,
                        sortable: true
                    },
                    { name: 'apelido', align: 'center', label: 'Apelido', field: 'apelido', sortable: true },
                    { name: 'documento', label: 'Documento', field: 'documento', sortable: true, format: val => this.documentFormat(val) },
                ]
        }
    },
    methods: {
        getUpdatedClients(clientsList) {
            this.clients = clientsList
        },
        resetSelection() {
            this.selection = []
            this.editMode = false
            getClients().then( response => {
                this.clients = response.data
            })
        },
        showClientForm(mode) {
            if (mode === 'create') {
                this.createMode = !this.createMode
                this.editMode = false
            } else {
                this.editMode = !this.editMode
                this.createMode = false
            }
            this.showForm = this.createMode || this.editMode ? true : false
            this.deleteMode = false
        },
        setSearchField() {
            this.searchField = !this.searchField
            if (!this.searchField) {
                this.filteredClients = []
            }
        },
        closeForm(status) {
            this.createMode = status
            this.editMode = status
            this.showForm = this.createMode || this.editMode ? true : false
        },
        openDeleteMode() {
            this.deleteMode = !this.deleteMode
            this.showForm = false
        },
        searchClient() {
            this.filteredClients = this.clients.filter( client => {
                if ( client.id === Number(this.searchValue)
                || client.nome.includes(this.searchValue)
                || client.apelido.includes(this.searchValue)
                || client.documento.includes(this.searchValue)) {
                    return client
                }
            })
            if (this.filteredClients.length < 1) {
                Notify.create({
                    type: 'positive',
                    color: 'positive',
                    timeout: 2000,
                    position: 'top-right',
                    message: `Client not recorded, got from Receita Federal API`
                })
                const cnpj = this.searchValue.replace(/\D/g, '');
                jsonp(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, (err, data) => {
                    console.log(data)
                    const pj = {
                        id: null,
                        nome: data.nome,
                        apelido: data.fantasia,
                        documento: data.cnpj
                    }
                    this.filteredClients.push(pj)
                })
            }
        },
        clearSearch() {
            this.searchValue = ''
            this.filteredClients = this.clients
        },
        deleteSelectedClients() {
            this.selection.forEach( (client) => {
                deleteClient(client.id).then( response => {
                    if (response.status === 200) {
                        this.clients = response.data
                    }
                })
            })
        },
        documentFormat(value) {
            const str = value.split("")
            if (value.length === 11) {
                return `${str[0]+str[1]+str[2]}.${str[3]+str[4]+str[5]}.${str[6]+str[7]+str[8]}-${str[9]+str[10]}`
            } else {
                // ##.###.###/####-##
                return `${str[0]+str[1]}.${str[2]+str[3]+str[4]}.${str[5]+str[6]+str[7]}/${str[8]+str[9]+str[10]+str[11]}-${str[12]+str[13]}`
            }
        }
    },
}
</script>

<style>
    .new-client {
        color: rgb(66, 186, 61);
        cursor: pointer;
    }
    .toolbar {
        margin: 15px 0;
        font-size: 80px;
    }

    .toolbar button {
        margin: 0 15px;
    }

    .delete-button {
        margin: 15px 0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
        opacity: 0;
    }
</style>
