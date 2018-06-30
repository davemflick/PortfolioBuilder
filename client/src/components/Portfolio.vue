<template>
	<h1>Hello </h1>
</template>

<script>
	import PortfolioService from '@/services/PortfolioService';
	import appFormPanel from './universal/FormPanel.vue';

	export default{
		data(){
			return {
				user: null
			}
		},
		async mounted(){
			const username= this.$store.state.route.params.username
			if(!username){
				this.$router.push({name: 'Home'});
				return;
			}
			if(this.$store.state.userLoggedIn){
				this.user = this.$store.state.user;
			}
			const portfolio = await PortfolioService.findPortfolio(username);
		}
	}
</script>
<style scoped>
.error-alert{
	text-align: center;
	color: #dd1212;
}

</style>