<template>
	<app-form-panel title="Let's add a project" >
		<form id="login-form">
			<v-text-field type="text" label="Name" v-model="project.name"></v-text-field>
			<v-text-field type="text" label="Link" v-model="project.link"></v-text-field>
			<v-textarea label="Description" v-model="project.description"></v-textarea>
			<v-text-field v-show="false" type="text" label="Image" v-model="project.images[0].path" :disabled="true"></v-text-field>
		</form>
		<br>
		<v-btn @click="openUploadModal({ type: 'projectAdd' })">Add Image</v-btn>
		<br>
		<div v-if="error" class="error-alert">{{ error }}</div>
		<br>
		<v-btn dark color="primary" @click="addUserProject" >Next Step</v-btn>
		<v-dialog v-model="uploadModal" width="500" >
			<app-file-uploader :uploadTarget="uploadTarget" ref="fileUploadComponent" v-on:close="closeUploadModal"></app-file-uploader>
		</v-dialog>
	</app-form-panel>
</template>

<script>
	import appFormPanel from '../universal/FormPanel.vue';
	import PortfolioService from '@/services/PortfolioService.js';
	import appFileUploader from '../universal/FileUploader.vue';
	export default{
		props: ['portfolioId'],
		data(){
			return {
				project:{
					name: null,
					link: null,
					description: null,
					images: [
						{
							path: null,
							isMain: true
						}
					]
				},
				error: null,
				uploadModal: false,
				uploadTarget: null
			}
		},
		components:{
			appFormPanel,
			appFileUploader
		},
		watch:{
			uploadModal(){
				if(!this.uploadModal){
					this.uploadTarget = null;
					this.$refs.fileUploadComponent.clearUploader();
				}
			}
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
			},
			//Upload an Image, but will only be associated to a project after one is created?
			openUploadModal(targetData){
				targetData.currentPictures = [];
				console.log(targetData);
				this.uploadTarget = targetData
				this.uploadModal = true;
			},
			closeUploadModal(img){
				this.project.images[0].path = img.filePath;
        this.uploadModal = false;
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