<template>
	<v-layout row>
		<v-flex xs10 offset-xs1 sm8 offset-sm2 md6 offset-md3 >
			<app-form-panel title="Register with PortBuilder">
				<form id="login-form">
					<v-layout row>
						<v-flex xs12 sm6 pr-1>
							<v-text-field type="text" label="First Name" required v-model="user.fname"></v-text-field>
						</v-flex>
						<v-flex xs12 sm6 pl-1>
							<v-text-field type="text" label="Last Name" required v-model="user.lname"></v-text-field>
						</v-flex>
					</v-layout>
					
					<v-text-field type="email" label="Email" required v-model="user.email"></v-text-field>
					<v-text-field type="password" label="Password" required v-model="user.password"></v-text-field>
					<v-text-field type="password" label="Confirm Password" required v-model="user.confirmPassword"></v-text-field>
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
					const response = await AuthenticationService.register(this.user);
					console.log(response.data)
					if(response.data.Ok){
						this.$store.dispatch('setUser', response.data.user);
					} else {
						this.error = response.data.message
					}
				}catch(error){
					this.error = error.response
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