<template>
  <div>
    <form>
      <v-layout wrap>
        <v-flex xs12 sm6 px-1>
          <v-textarea type="text" label="About" v-model="portfolio.aboutUser"></v-textarea>
          <br>
          <v-btn dark color="primary" @click="$emit('update')">Update</v-btn>
        </v-flex>
        <v-flex xs12 sm6 px-1 text-xs-center>
          <v-avatar :size="150" :tile="true">
            <img v-if="portfolio.profilePicture.length > 0"
            :src="'http://localhost:8081/' + portfolio.profilePicture.find((p)=>{return p.isMain}).path" />
            <img v-else :src="defaultProfileImg" />
          </v-avatar>
          <br><br>
          <v-flex xs12 pl-1 text-xs-center>
            <slot name="addProfileImage"></slot>
          </v-flex>
        </v-flex>
      </v-layout>
    </form>
    <br>
    <div v-if="generalError" class="error-alert alert">{{ generalError }}</div>
    <div v-if="generalSuccess" class="success-alert alert">{{ generalSuccess }}</div>
  </div>
</template>

<script>
  import defaultProfileImg from '@/assets/emptyProfile.png';
  export default {
    props: ['portfolio', 'generalSuccess', 'generalError'],
    data(){
      return{
        defaultProfileImg: defaultProfileImg
      }
    },
    mounted(){
      console.log(this.portfolio.profilePicture)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
