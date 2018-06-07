<template>
	<v-layout row>
		<v-flex xs10 offset-xs1 sm6 offset-sm3 md4 offset-md4 >
			<app-form-panel title="Login">
				<form id="login-form">
					<v-text-field type="email" label="Email" required v-model="user.email"></v-text-field>
					<v-text-field type="password" label="Password" required v-model="user.password"></v-text-field>
				</form>
				<br>
				<div v-if="error" class="error-alert">{{ error }}</div>
				<br>
				<v-btn dark color="primary">Login</v-btn>
			</app-form-panel>
		</v-flex>
	</v-layout>
</template>

<script>
	import appFormPanel from './universal/FormPanel.vue';

	export default{
		data(){
			return {
				user:{
					email: '',
					password: ''
				},
				error: null
			}
		},
		components:{
			appFormPanel
		}
	}
</script>
<style scoped>

</style>