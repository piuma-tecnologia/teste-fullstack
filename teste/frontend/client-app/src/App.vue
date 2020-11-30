<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <ClientList />
    </q-page-container>
  </q-layout>
</template>

<script>
import ClientList from './components/client/client-list.vue'

export default {
  name: 'LayoutDefault',

  components: {
    ClientList
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style>
</style>
