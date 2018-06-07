<template>
	<div>
		<v-toolbar dark color="primary">
			<v-menu :nudge-width="150" offset-y >
				<v-toolbar-title slot="activator">
					<v-toolbar-side-icon></v-toolbar-side-icon>
				</v-toolbar-title>
				<v-list>
					<v-list-tile v-for="item in items" :key="item" @click="">
						<v-list-tile-title v-text="item"></v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-menu>
			<v-toolbar-title class="white--text">
				<router-link :to="{name: 'Home'}" tag="span">PortBuilder</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-text-field class="nav-search" color="#fff" prepend-icon="search" hide-details single-line></v-text-field>
				<v-menu :nudge-width="150"  offset-y class="hidden-sm-and-down">
					<v-toolbar-title slot="activator">
						<v-btn icon>
							<v-icon>more_vert</v-icon>
						</v-btn>
					</v-toolbar-title>
					<v-list>
						<v-list-tile v-for="type in loginItems" :key="type" @click="">
							<v-list-tile-title v-text="type"></v-list-tile-title>
						</v-list-tile>
					</v-list>
				</v-menu>
		</v-toolbar>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				searchBar: false,
				items: ['itemOne', 'itemTwo'],
				loginItems: ['Sign Up', 'Login', 'Logout']
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