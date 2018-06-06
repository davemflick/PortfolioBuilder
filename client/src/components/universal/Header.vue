<template>
	<div>
	<v-toolbar dark color="primary">
		<v-toolbar-side-icon></v-toolbar-side-icon>
		<v-toolbar-title class="white--text">
			<router-link :to="{name: 'Home'}" tag="span">PortBuilder</router-link>
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-text-field class="nav-search" color="#fff" prepend-icon="search" hide-details single-line></v-text-field>
		<v-toolbar-items  class="hidden-sm-and-down">
			<v-btn icon>
				<v-icon>more_vert</v-icon>
			</v-btn>
		</v-toolbar-items>
	</v-toolbar>
</div>
</template>

<script>
export default {
	data(){
		return {
			searchBar: false
		}
	}
}
</script>

<style scoped>
 .nav-search{
 	max-width: 200px;
 	margin-right: 20px;
 }
</style>