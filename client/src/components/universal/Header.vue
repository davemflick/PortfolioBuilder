<template>
	<div>
		<v-toolbar dark color="primary">
			<v-menu :nudge-width="150" offset-y >
				<v-toolbar-title class="pl-2" slot="activator">
					<v-toolbar-side-icon></v-toolbar-side-icon>
				</v-toolbar-title>
				<v-list>
					<v-list-tile v-for="item in items" :key="item" @click="">
						<v-list-tile-title v-text="item"></v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-menu>
			<v-toolbar-title class="white--text">
				<router-link :to="{name: 'Home'}" tag="span" class="hovlink">Porteloper</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-text-field class="nav-search" color="#fff" prepend-icon="search" hide-details single-line></v-text-field>
			<v-menu :nudge-width="150"  offset-y class="hidden-sm-and-down">
				<v-toolbar-title class="pr-2" slot="activator">
					<v-btn icon>
						<v-icon>more_vert</v-icon>
					</v-btn>
				</v-toolbar-title>
				<v-list>
					<v-list-tile v-if="!this.$store.state.userLoggedIn">
						<router-link :to="{name: 'Login'}"  tag="span">
							<v-list-tile-title class="hovlink">Login</v-list-tile-title>
						</router-link>
					</v-list-tile>
					<v-list-tile v-if="!this.$store.state.userLoggedIn">
						<router-link :to="{name: 'SignUp'}"  tag="span">
							<v-list-tile-title class="hovlink">Sign Up</v-list-tile-title>
						</router-link>
					</v-list-tile>
					<v-list-tile v-if="this.$store.state.userLoggedIn">
						<v-list-tile-title class="hovlink" @click="logout">Logout</v-list-tile-title>
					</v-list-tile>
					<v-list-tile v-if="this.$store.state.userLoggedIn">
						<router-link :to="{name: 'Portfolio', params: {username: this.$store.state.user.username }}"  tag="span">
							<v-list-tile-title class="hovlink">My Portfolio</v-list-tile-title>
						</router-link>
					</v-list-tile>
					<v-list-tile v-if="this.$store.state.userLoggedIn">
						<router-link :to="{name: 'EditPortfolio', params: {username: this.$store.state.user.username }}"  tag="span">
							<v-list-tile-title class="hovlink">Edit Portfolio</v-list-tile-title>
						</router-link>
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
				items: ['itemOne', 'itemTwo']
			}
		},
		methods:{
			logout(){
				this.$store.dispatch('setUser', null);
				this.$router.push({name: 'Login'});
			}
		}
	}
</script>

<style scoped>
.nav-search{
	max-width: 200px;
	margin-right: 20px;
}
.hovlink{
	transition: color .2s ease-in;
}
.hovlink:hover{
	color: #ccc;
	cursor: pointer;
}

</style>