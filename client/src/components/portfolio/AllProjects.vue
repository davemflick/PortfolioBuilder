<template>
	<v-flex xs12>
		<h2>Projects</h2>
		<v-layout wrap>
			<v-flex xs6 sm4 md3 
			class="pa-2 text-xs-center single-project"
			v-for="(project, i) in projects"
			:key="`project-${i}`" 
			@click="$emit('open', project)">
			<div class="pa-2">
				<div>
				<img v-if="project.images.length > 0" :src="`${serverImageHost}${project.images.find(p=>p.isMain).path}`" class="img-responsive" />
				<img v-else :src="defaultProject" class="img-responsive" />
			</div>
				<p>{{ project.name }}</p>
			</div>
		</v-flex>
	</v-layout>
</v-flex>
</template>

<script>
	import defaultProject from '@/assets/images/default-project.png';

	export default{
		props: ['projects'],
		data(){
			return {
				defaultProject: defaultProject
			}
		},
		mounted(){
			console.log(this.projects);
		}
	}

</script>

<style scoped>
.single-project>div{
	border: 1px solid #eee;
	border-radius: 2px;
	cursor: pointer;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: space-between;
}

.single-project>div>div{
	width: 100%;
}

.single-project>div>div img{
	max-height: 200px;
}

</style>