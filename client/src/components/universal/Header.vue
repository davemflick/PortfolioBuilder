<template>
	<v-toolbar dark color="primary">
		<v-toolbar-side-icon></v-toolbar-side-icon>
		<v-toolbar-title class="white--text">
			<router-link :to="{name: 'Home'}" tag="span">PortBuilder</router-link>
		</v-toolbar-title>
		<v-toolbar-title slot="extension" class="white--text" v-if="searchBar">
			<v-text-field color="#fff" type="text" id="site-searcher" name="SearchSite" label="Search Site" ></v-text-field>
		</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn icon @click="searchBar = !searchBar">
			<v-icon>search</v-icon>
		</v-btn>
		<v-toolbar-items  class="hidden-sm-and-down">
			<v-btn icon>
				<v-icon>more_vert</v-icon>
			</v-btn>
		</v-toolbar-items>
	</v-toolbar>
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
 #site-searcher{
 	border-bottom: 1px solid #fff !important;
 }
</style>