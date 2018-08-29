<template>
  <div>
    <form>
      <v-layout wrap>
        <v-flex xs12 sm6 px-1>
          <v-textarea label="About" v-model="portfolio.aboutUser"></v-textarea>
          <div v-if="portfolio">
            <v-text-field label="Github Account" v-model="portfolio.otherProfiles.github"></v-text-field>
            <v-text-field label="Linkedin Account" v-model="portfolio.otherProfiles.linkedin"></v-text-field>
            <v-text-field label="Other Portfolio" v-model="portfolio.otherProfiles.otherPortfolio"></v-text-field>
          </div>
          <v-layout row class="pa-1">
            <v-flex xs6>
              <slot name="addResume"></slot>
            </v-flex>
            <v-flex xs6>
              <h3  v-if="portfolio.resume">
                <a class="view-resume mx-2" :href="`${serverImageHost}${portfolio.resume}`" target="_blank">
                  <v-icon color="green">get_app</v-icon>
                </a>
                My Resume 
                <v-icon style="cursor: pointer;" color="red" @click="$emit('removeResume')">delete_forever</v-icon>
              </h3>
              
            </v-flex>
          </v-layout>
          
          <br>
          <div v-if="error" class="error-alert alert">{{ error }}</div>
          <div v-if="success" class="success-alert alert">{{ success }}</div>
          <br>
          <v-btn dark color="primary" @click="$emit('update')">Update</v-btn>
        </v-flex>
        <v-flex xs12 sm6 px-1 text-xs-center>
          <v-avatar :size="200" :tile="true">
            <img v-if="portfolio.profilePicture.length > 0"
            :src="serverImageHost + portfolio.profilePicture.find((p)=>{return p.isMain}).path" />
            <img v-else :src="defaultProfileImg" />
          </v-avatar>
          <br><br>
          <v-flex xs12 pl-1 text-xs-center>
            <slot name="addProfileImage"></slot>
          </v-flex>
        </v-flex>
      </v-layout>
    </form>
  </div>
</template>

<script>
  import defaultProfileImg from '@/assets/images/emptyProfile.png';
  export default {
    props: ['portfolio', 'success', 'error'],
    data(){
      return{
        defaultProfileImg: defaultProfileImg
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
