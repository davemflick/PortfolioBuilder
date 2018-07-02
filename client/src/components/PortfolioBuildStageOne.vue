<template>
	<app-form-panel title="Add Some Information" >
		<form id="login-form">
			<v-textarea label="About You" v-model="portfolioData.aboutUser"></v-textarea>
			<v-text-field type="text" label="Profile Picture" v-model="portfolioData.profilePicture"></v-text-field>
		</form>
		<br>
		<div v-if="error" class="error-alert">{{ error }}</div>
		<br>
		<v-btn dark color="primary">Next Step</v-btn>
	</app-form-panel>
</template>

<script>
	import appFormPanel from './universal/FormPanel.vue';

	export default{
		data(){
			return {
				portfolioData:{
				aboutUser: null,
				profilePicture: null
			},
			error: null
		}
	},
	components:{
		appFormPanel
	}
}
</script>
<style scoped>
.error-alert{
	text-align: center;
	color: #dd1212;
}

</style>