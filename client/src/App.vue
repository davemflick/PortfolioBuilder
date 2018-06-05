<template>
  <div id="app">
    <v-app>
      <app-header></app-header>
      <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import appHeader from './components/universal/Header.vue';
export default {
  name: 'App',
  components: {
    appHeader
  }
}
</script>

<style>

</style>
