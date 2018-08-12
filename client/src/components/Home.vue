<template>
  <section id="home-head">
    <v-container container>
      <h1 class="text-xs-center">
        Porteloper
      </h1>
      <h3 class="text-xs-center">
        Portfolios for Devlopers
      </h3>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  color: #fff;
  font-size: 6em;
  margin-bottom: 5px;
}
h3{
  font-size: 2em;
  color: #fff;
}

#home-head{
  background: url('../assets/images/home-background.png') no-repeat;
  background-position: center center;
  background-size: cover;
  min-height: 800px;
}

@media screen and (max-width: 600px){
  h1{
    font-size: 3.5em;
  }
  h3{
    font-size: 1.75em;
  }
}
</style>
