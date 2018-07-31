<template>
  <app-form-panel class="mb-3" title="Portfolio Styling" v-if="portfolio">
    <form>
      <v-layout column>
        <v-flex xs12>
          <h4>Pick Portfolio Font</h4>
          <v-radio-group v-model="font" @change="styleUpdate({type: 'fontFamily', value: font})">
            <v-radio label="Roboto (default)" value="'Roboto', sans-serif" style="font-family: 'Roboto', sans-serif"></v-radio>
            <v-radio label="Libre Franklin" value="'Libre Franklin', sans-serif" style="font-family: 'Libre Franklin', sans-serif"></v-radio>
            <v-radio label="Merriweather Sans" value="'Merriweather Sans', sans-serif" style="font-family: 'Merriweather Sans', sans-serif"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </form>
  </app-form-panel>
</template>

<script>
  import appFormPanel from '../../universal/FormPanel.vue';
  import PortfolioService from '@/services/PortfolioService';
  export default {
    props: ['portfolio', 'success', 'error'],
    data(){
      return{
        font: this.portfolio.styles.fontFamily ? this.portfolio.styles.fontFamily : "'Roboto', sans-serif"
      }
    },
    components:{
      appFormPanel
    },
    methods: {
      async styleUpdate(style){
        this.portfolio.styles[style.type] = style.value;
        console.log(this.portfolio.styles)
        try{
          const updatedPortfolio = await PortfolioService.updatePortfolio(this.portfolio._id, {styles: this.portfolio.styles});
          if(updatedPortfolio.data.ok){
            this.generalSuccess = 'Style Updated';
          }
        } catch(error){
          console.log("ERROR", error);
          alert("Something has gone wrong updating active state");
        }
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
