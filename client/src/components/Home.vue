<template>
  <section id="home-head">
    <v-container container>
      <h1 class="text-xs-center">
        Porteloper
      </h1>
      <h3 class="text-xs-center mb-5">
        Portfolios for Devlopers
      </h3>
      <v-layout class="my-4" wrap>
        <v-flex xs12 sm6 md4 class="pa-2 text-xs-center">
          <div class="hp-block">
            <v-icon class="hp-icon pa-3" color="primary">person_add</v-icon>
            <h4 class="pa-3">
              Create an Account
            </h4>
          </div>
        </v-flex>
        <v-flex xs12 sm6 md4 class="pa-2 text-xs-center">
          <div class="hp-block">
            <v-icon class="hp-icon pa-3" color="primary">build</v-icon>
            <h4 class="pa-3">
              Build your Portfolio
            </h4>
          </div>
        </v-flex>
        <v-flex xs12 sm6 md4 class="pa-2 text-xs-center">
          <div class="hp-block">
            <v-icon class="hp-icon pa-3" color="primary">public</v-icon>
            <h4 class="pa-3">
              Share your Work
            </h4>
          </div>
        </v-flex>
      </v-layout>
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

.hp-block{
  min-height: 250px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12);
}

.hp-icon{
  font-size: 9em;
}

.hp-block h4{
  font-size: 1.33em;
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
