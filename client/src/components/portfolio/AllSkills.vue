<template>
	<v-flex xs12 v-if="skills.length > 0">
		<h2>Skills</h2>
		<v-layout wrap>
			<v-flex xs6 sm4 md3 
			class="pa-2 text-xs-center"
			v-for="(skill, i) in skills"
			:key="`skill-${i}`">
			<div class="pa-2">
				<i :class="`devicon-icon devicon-${skill}`"></i>
			</div>
		</v-flex>
	</v-layout>
</v-flex>
</template>

<script>
	export default{
		props: ['skills']
	}

</script>

<style scoped>

</style>