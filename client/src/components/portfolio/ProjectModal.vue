<template>
	<v-layout row justify-center>
		<v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
			<v-card>
				<v-toolbar dark color="primary">
					<v-btn icon dark @click="$emit('close')">
						<v-icon>close</v-icon>
					</v-btn>
					<v-toolbar-title>Project</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn dark flat @click.native="dialog = false">Save</v-btn>
					</v-toolbar-items>
				</v-toolbar>
				<v-container v-if="project">
					<h1>{{ project.name }}</h1>
					<img v-if="project.images.length > 0" :src="`http://localhost:8081/${project.images.find(p=>p.isMain).path}`" class="img-responsive" />
					<img v-else :src="defaultProjectImage" class="img-responsive" />
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
				defaultProjectImage
			}
		}
	}
</script>
<style scoped>


</style>
