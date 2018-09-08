<template>
	<v-layout row justify-center>
		<v-dialog :value="isOpen" @input="$emit('close')" fullscreen hide-overlay transition="dialog-bottom-transition">
			<v-card>
				<v-toolbar dark color="primary">
					<v-btn icon dark @click="$emit('close')">
						<v-icon>close</v-icon>
					</v-btn>
					<v-toolbar-title>Project</v-toolbar-title>
					<v-spacer></v-spacer>
				</v-toolbar>
				<v-container v-if="project">
					<v-layout wrap>
						<v-flex xs12 sm5 class="pa-2 text-xs-center">
							<img v-if="mainImage" 
							:src="`${serverImageHost}${mainImage.path}`" 
							class="img-responsive main-image"
							@click="openImageModal(`${serverImageHost}${mainImage.path}`)" />
							<img v-else :src="defaultProjectImage" class="img-responsive" />
							<br>
							<v-layout wrap v-if="imageThumbs" align-content-center class="text-xs-center project-images">
								<v-flex xs4 md3 class="pa-1 text-xs-center" v-for="(img, i) in imageThumbs" :key="`p-img-${i}`">
									<v-avatar :size="70" :tile="true">
										<img class="project-thumb" :src="`${serverImageHost}${img.path}`" alt="Project Image" @click="mainImage = img" />
									</v-avatar>
								</v-flex>
							</v-layout>
						</v-flex>
						<v-flex xs12 sm7 class="pa-2">
							<h1 class="text-xs-center">{{ project.name }}</h1>
							<div v-if="project.description" class="py-2">
								<h3>About</h3>
								<p >{{ project.description }}</p>
							</div>
							<div v-if="project.stack" class="py-2">
								<h3>Stack</h3>
								<p >{{ project.stack }}</p>
							</div>
							<div v-if="project.link || project.codeLink" class="py-2">
								<h3>Externals</h3>
								<v-btn v-if="project.link" color="primary" class="mr-2 ml-0" :href="project.link" target="_blank">View Project</v-btn>
								<v-btn v-if="project.codeLink" color="primary" :href="project.codeLink" target="_blank">Source Code</v-btn>
							</div>
						</v-flex>
					</v-layout>
					<v-dialog v-model="imageModal" max-width="600">
						<div class="pa-3 text-xs-center" style="background-color: #fff; width: 100%;">
							<img v-if="imageModal" :src="`${serverImageHost}${mainImage.path}`" class="img-responsive" />
						</div>
					</v-dialog>
				</v-container>
			</v-card>
		</v-dialog>
	</v-layout>
</template>


<script>
	import defaultProjectImage from '@/assets/images/default-project.png';

	export default{
		props:['project', 'isOpen'],
		data(){
			return{
				defaultProjectImage,
				mainImage: null,
				imageThumbs: null,
				imageModal: false,
				picInImageModal: null
			}
		},
		watch:{
			isOpen(){
				if(this.isOpen && this.project.images.length > 0){
					this.mainImage = this.project.images.find(p=>p.isMain)
					this.imageThumbs = this.project.images.filter(p => !p.isMain);
					this.imageThumbs.splice(0, 0, this.mainImage);
				}else{
					this.mainImage = null;
					this.imageThumbs = null;
				}
			}
		},
		methods:{
			openImageModal(img){
				this.imageModal = true;
				this.picInImageModal = img;
			}
		}
	}
</script>
<style scoped>

img.img-responsive{
	max-width: 100%;
}

.project-images{
	max-width: 300px;
	margin: 0 auto;
}

.main-image{
	border-radius: 7px;
	max-height: 325px;
	cursor: pointer;
}

.project-thumb{
	cursor: pointer;
	box-shadow: 1px 1px #ddd;
	border-radius: 3px;
}

</style>
