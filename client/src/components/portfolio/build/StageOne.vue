<template>
	<app-form-panel title="Let's get to know you!" >
		<form id="login-form">
			<v-textarea label="About You" v-model="portfolioData.aboutUser"></v-textarea>
			<br><br>
			<v-layout wrap>
				<v-flex xs12 sm6>
					<v-btn @click="openUploadModal({type: 'portfolioImage', _id: portfolioId})">Add Portfolio Image</v-btn>
				</v-flex>
				<v-flex xs12 sm6 v-if="this.profilePicturePath">
					<v-badge color="green">
						<span slot="badge"><v-icon dark>done</v-icon></span>
						<v-avatar  :size="100" color="grey lighten-4" >
							<img :src="`http://localhost:8081/${profilePicturePath}`" alt="avatar">
						</v-avatar>
					</v-badge>
				</v-flex>
			</v-layout>
		</form>
		<br>
		<div v-if="error" class="error-alert">{{ error }}</div>
		<br>
		<v-btn dark color="primary" @click="completeStageOne">Continue</v-btn>
		<v-dialog v-model="uploadModal" width="500" >
			<app-file-uploader :uploadTarget="uploadTarget" ref="fileUploadComponent" v-on:close="closeUploadModal"></app-file-uploader>
		</v-dialog>
	</app-form-panel>
</template>

<script>
	import appFormPanel from '../../universal/FormPanel.vue';
	import PortfolioService from '@/services/PortfolioService.js';
	import appFileUploader from '../../universal/FileUploader.vue';
	export default{
		props: ['portfolioId', 'profilePictures'],
		data(){
			return {
				portfolioData:{
					aboutUser: null,
				},
				profilePicturePath: null,
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
		methods: {
			async completeStageOne(){
				try{
					const portfolioUpdate = await PortfolioService.updatePortfolio(this.portfolioId, this.portfolioData);
					console.log(portfolioUpdate);
					if(!portfolioUpdate.data.ok){
						this.error = "Error updating portfolio";
						return;
					} else {
						this.$emit('next');
					}
				}catch(error){
					console.log("ERROR", error);
					this.error = error;
				}
			},
			openUploadModal(targetData){
				targetData.currentPictures = [];
				console.log(targetData);
				this.uploadTarget = targetData
				this.uploadModal = true;
			},
			closeUploadModal(data){
				console.log("YOUR DATA SIR", data);
				this.profilePicturePath = data.filePath;
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