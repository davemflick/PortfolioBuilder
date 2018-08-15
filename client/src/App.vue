<template>
  <div id="app">
    <v-app>
      <app-header></app-header>
      <v-content>
        <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
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
img.img-responsive{
  max-width: 100%;
}

.alert{
  text-align: center;
  font-size: 15px;
}
.success-alert{
  color: #01b900;
}
.error-alert{
  color: #dc0000;
}
.devicon-icon{
  font-size: 6em;
}
.v-jumbotron__image{
  min-width: 100px;
  max-width: 100%;
}

.invalidInput div.v-text-field__slot input{
  color: #dd1122 !important;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

@media screen and (max-width: 600px){
  .v-bottom-nav{
    flex-wrap: wrap;
    height: 112px !important;
  }
  .v-bottom-nav button.v-btn{
    max-height: 50px;
    max-width: 32%;
  }

  .v-bottom-sheet.v-dialog--active{
    overflow: scroll;
  }
}


</style>
