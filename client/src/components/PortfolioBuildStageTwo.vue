<template>
	<app-form-panel title="Let's add a project" >
		<form id="login-form">
			<v-text-field type="text" label="Name" v-model="project.name"></v-text-field>
			<v-text-field type="text" label="Link" v-model="project.link"></v-text-field>
			<v-textarea label="Description" v-model="project.description"></v-textarea>
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
		props: ['portfolioId'],
		data(){
			return {
				project:{
					portfolioId: null,
					name: null,
					link: null,
					description: null
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