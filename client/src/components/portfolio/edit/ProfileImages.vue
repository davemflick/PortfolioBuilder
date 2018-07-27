<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-carousel
        delimiter-icon="stop"
        :cycle="false"
        light
        >
          <v-carousel-item
          v-for="(img,i) in images"
          :key="`profile-img-${i}`"
          :src="`http://localhost:8081/${img.path}`"
          ></v-carousel-item>
         </v-carousel>
         <v-card-actions>
          <v-btn flat color="orange">Make Main</v-btn>
          <v-btn flat color="orange">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

  export default {
    props: ['images'],
    data(){
      return {
        error: null,
        successfulUpdate: null
      }
    },
    mounted(){
      console.log(this.images);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
