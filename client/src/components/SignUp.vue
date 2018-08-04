<template>
	<v-layout row>
		<v-flex xs10 offset-xs1 sm8 offset-sm2 md6 offset-md3 >
			<app-form-panel title="Register with PortBuilder">
				<form id="login-form">
					<v-layout wrap>
						<v-flex xs12 sm6 pr-1>
							<v-text-field type="text" label="First Name" required v-model="user.fname"></v-text-field>
						</v-flex>
						<v-flex xs12 sm6 pl-1>
							<v-text-field type="text" label="Last Name" required v-model="user.lname"></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout wrap>
						<v-flex xs12 sm6 pr-1>
							<v-text-field type="text" label="Username" required v-model="user.username"></v-text-field>
						</v-flex>
						<v-flex xs12 sm6 pr-1>
							<v-text-field type="email" label="Email" required v-model="user.email"></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout wrap>
						<v-flex xs12 sm6 pr-1>
							<v-text-field type="password" label="Password" required v-model="user.password"></v-text-field>
						</v-flex>
						<v-flex xs12 sm6 pr-1>
							<v-text-field type="password" label="Confirm Password" required v-model="user.confirmPassword"  @keyup.enter="register"></v-text-field>
						</v-flex>
					</v-layout>
				</form>
				<br>
				<div v-if="error" class="error-alert">{{ error }}</div>
				<br>
				<v-btn dark color="primary" @click="register">Sign Up</v-btn>
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
					fname: '',
					lname: '',
					username: '',
					email: '',
					password: '',
					confirmPassword: ''
				},
				error: null
			}
		},
		methods: {
			async register(){
				try{
					this.error = null;
					console.log(this.user)
					const response = await AuthenticationService.register(this.user);
					if(response.data.ok){
						this.$store.dispatch('setUser', response.data.user);
						this.$store.dispatch('setToken', response.data.token);
						console.log(response.data);
						this.$router.push({name: 'PortfolioBuild', params: {username: response.data.user.username}})
					} else {
						if(response.data.error.code == 11000){
							this.error = 'Email and/or Username address provided is already registered with this site.'
						} else{
							this.error = response.data.message
						}
						
					}
				}catch(error){
					console.log("ERROR", error);
					if(error.data.message){
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