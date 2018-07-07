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
		<v-btn dark color="primary" @click="addUserProject" >Next Step</v-btn>
	</app-form-panel>
</template>

<script>
	import appFormPanel from '../universal/FormPanel.vue';
	import PortfolioService from '@/services/PortfolioService.js';

	export default{
		props: ['portfolioId'],
		data(){
			return {
				project:{
					name: null,
					link: null,
					description: null
				},
				error: null
			}
		},
		components:{
			appFormPanel
		},
		methods:{
			async addUserProject(){
				try{
					let newProject = this.project;
					newProject.portfolioId = this.portfolioId;
					const project = await PortfolioService.addUserProject(this.portfolioId, newProject);
					console.log(project);
					if(!project.data.ok){
						this.error = project.data.message;
						return;
					}
					this.$store.dispatch('setBuildStage', null);
					this.$router.push({name: 'Portfolio', params:{username: project.data.portfolio.username}})
				}catch(error){
					console.log("ERROR ERROR: ", error);
					this.error = error;
				}
			}
		}
	}
</script>
<style scoped>
.error-alert{
	text-align: center;
	color: #dd1212;
}

</style>