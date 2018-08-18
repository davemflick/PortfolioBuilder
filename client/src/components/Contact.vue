<template>
  <v-container>
    <h1 class="text-xs-center">
      Contact Us
    </h1>
    <p class="text-xs-center">
      Have any questions? <br />
      Found a bug? <br />
      Send us a message and we'll try and resolve the issue.
    </p>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
        <v-card>
          <app-email-form :user="user" :closeBtn="false" :template="'contact'"></app-email-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import appEmailForm from './universal/EmailForm.vue';

  export default{
    components:{
      appEmailForm
    },
    data(){
      return{
        user: {
          username: 'Porteloper',
          email: 'porteloper@gmail.com'
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
