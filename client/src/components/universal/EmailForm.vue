<template>
	<v-layout>
		<v-flex xs12 sm6 class="pa-1">
			<v-text-field  v-model="emailMsg.from" label="From" required ></v-text-field>
		</v-flex>
		<v-flex xs12 sm6 class="pa-1">
			<v-text-field  v-model="emailMsg.about" label="About" required ></v-text-field>
		</v-flex>
		<v-flex xs12 sm6 class="pa-1">
			<v-textarea  v-model="emailMsg.msg" label="Message" required ></v-textarea>
		</v-flex>
	</v-layout>
</template>

<script>
export default{
	data(){
		return{
			emailMsg: {
				from: null,
				about: null,
				message: null
			}
		}
	}
}
</script>
<style scoped>


</style>