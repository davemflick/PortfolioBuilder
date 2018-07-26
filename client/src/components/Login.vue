<template>
	<v-layout row>
		<v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 >
			<app-form-panel title="Login to PortBuilder">
				<form id="login-form">
					<v-text-field type="email" label="Email/Username" required v-model="user.emailOrUsername"></v-text-field>
					<v-text-field type="password" label="Password" required v-model="user.password"></v-text-field>
				</form>
				<br>
				<div v-if="error" class="error-alert">{{ error }}</div>
				<br>
				<v-btn dark color="primary" @click="login">Login</v-btn>
			</app-form-panel>
		</v-flex>
	</v-layout>
</template>

<script>
	import AuthenticationService from '@/services/AuthenticationService';
	import appFormPanel from './universal/FormPanel.vue';

	export default{
		data(){
			return {
				user:{
					emailOrUsername: '',
					password: ''
				},
				error: null
			}
		},
		methods:{
			async login(){
				try{
					this.error = null;
					const response = await AuthenticationService.login(this.user);
					console.log("Succesful login", response.data)
					if(response.data.ok){
						this.$store.dispatch('setUser', response.data.User);
						this.$router.push({name: 'Portfolio'})
					} else {
						if(response.data.error.code == 11000){
							this.error = 'Email address provided is already registered with this site.'
						} else{
							console.log(response.data)
							this.error = response.data.message
						}
						
					}
				}catch(error){
					console.log("ERROR", error);
					if(error.data && error.data.message){
						this.error = error.data.message
					} else {
						this.error = "500 Internal Server Error"
					}
				}
			}
		},
		components:{
			appFormPanel
		}
	}
</script>
<style scoped>
.error-alert{
	text-align: center;
	color: #dd1212;
}

</style>