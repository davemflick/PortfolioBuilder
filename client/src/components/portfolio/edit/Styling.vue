<template>
  <div>
    <form>
      <v-layout column>
        <v-flex xs12>
          <h4>Pick Portfolio Font</h4>
          <v-radio-group v-model="font" @change="$emit('styleChange', {type: 'fontFamily', value: font})">
            <v-radio label="Roboto (default)" value="'Roboto', sans-serif" style="font-family: 'Roboto', sans-serif"></v-radio>
            <v-radio label="Libre Franklin" value="'Libre Franklin', sans-serif" style="font-family: 'Libre Franklin', sans-serif"></v-radio>
            <v-radio label="Merriweather Sans" value="'Merriweather Sans', sans-serif" style="font-family: 'Merriweather Sans', sans-serif"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </form>
  </div>
</template>

<script>
  import defaultProfileImg from '@/assets/emptyProfile.png';
  export default {
    props: ['portfolio', 'success', 'error'],
    data(){
      return{
        font: this.portfolio.styles.fontFamily ? this.portfolio.styles.fontFamily : "'Roboto', sans-serif"
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.view-resume{
  text-decoration: none;
}
</style>
