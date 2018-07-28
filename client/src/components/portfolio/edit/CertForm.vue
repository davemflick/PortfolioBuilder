<template>
  <form>
    <v-layout wrap class="pa-2">
      <v-flex xs12 sm6 px-1>
        <v-text-field type="text" label="Name" v-model="cert.name"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 px-1>
        <v-text-field type="text" label="Date Obtained" v-model="cert.dateObtained" @click="dateModal = true"></v-text-field>
        <v-dialog ref="dialog" v-model="dateModal" persistent lazy full-width width="290px" >
          <v-date-picker v-model="cert.dateObtained" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dateModal = false; cert.dateObtained = null">Remove</v-btn>
            <v-btn flat color="primary" @click="dateModal = false">Set</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs12 px-1>
        <v-textarea type="text" 
        label="Description" 
        v-model="cert.about"
        ></v-textarea>
      </v-flex>
      <v-flex xs4 sm2>
        <v-btn @click="$emit('openUploadModal', {type: 'certification', _id: portfolioId})">Add Image</v-btn>
      </v-flex>
      <v-flex v-if="!cert.picturePath" xs8 sm10>
        <p class="text-lg-right">No Certification Image</p>
      </v-flex>
      <v-flex xs12 class="py-1">
        <v-btn class="primary" @click="$emit('submit', cert)">Submit</v-btn>
      </v-flex>
    </v-layout>
  </form>
</template>

<script>
  export default {
    props: ['cert', 'portfolioId'],
    data(){
      return {
        error: null,
        dateModal: false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.new-cert{
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
