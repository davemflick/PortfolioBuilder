<template>
	<div class="py-3" style="width: 100%; background-color: #fff;">
		<v-container>
			<v-layout row>
				<v-flex xs10>
					<h2 class="text-xs-left mb-2 primary--text">
						Send {{ emailMsg.toUsername }} an Email
					</h2>
				</v-flex>
				<v-flex v-show="closeBtn" xs2 class="text-xs-right close-icon">
					<v-icon color="red" @click="$emit('close')">cancel</v-icon>
				</v-flex>
			</v-layout>
			<v-layout wrap class="pa-2 email-form-layout">
				<v-flex xs12 sm6 class="pa-1">
					<v-text-field  v-model="emailMsg.fromName" label="Name" :class="{'invalidInput': emailMsg.fromName ? validate('name', emailMsg.fromName) ? false : true : false}"></v-text-field>
				</v-flex>
				<v-flex xs12 sm6 class="pa-1">
					<v-text-field  v-model="emailMsg.fromEmail" label="Email" :class="{'invalidInput': emailMsg.fromEmail ? validate('email', emailMsg.fromEmail) ? false : true : false}"></v-text-field>
				</v-flex>
				<v-flex xs12 class="pa-1">
					<v-text-field  v-model="emailMsg.about" label="About"></v-text-field>
				</v-flex>
				<v-flex xs12 class="pa-1">
					<v-textarea  v-model="emailMsg.message" label="Message"></v-textarea>
				</v-flex>
				<v-flex xs12 class="text-xs-left">
					<p class="my-0 alert error-alert" v-show="nameError">{{ nameError }}</p>
					<p class="my-0 alert error-alert" v-show="emailError">{{ emailError }}</p>
					<p class="my-0 alert error-alert" v-show="error">{{ error }}</p>
				</v-flex>
				<v-flex xs12 class="text-xs-right" v-if="captchaGood">
					<v-btn flat color="primary" @click="sendEmail">Send</v-btn>
				</v-flex>
				<v-flex xs12 class="text-xs-center" v-if="!captchaGood">
					<app-recaptcha v-on:verify="verifyCaptcha" v-on:reset="captchaGood = false"></app-recaptcha>
				</v-flex>
				<v-flex v-if="emailSending" xs12 class="text-xs-center">
					<v-progress-circular :size="50" color="primary" indeterminate ></v-progress-circular>
				</v-flex>
				<v-flex v-if="successfullySent" xs12 class="text-xs-center">
					<p class="alert success-alert"> Your message has been sent! </p>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	import UserService from '@/services/UserService.js';
	import appRecaptcha from './ReCaptcha.vue';

	require('dotenv').config();
	export default{
		props: ["user", "closeBtn", "template"],
		components:{
			appRecaptcha
		},
		data(){
			return{
				emailMsg: {
					toUsername: this.user.username,
					toEmail: this.user.email,
					fromEmail: null,
					fromName: null,
					about: null,
					message: null,
					secret: process.env.EMAIL_SECRET,
					template: this.template
				},
				nameError: null,
				emailError: null,
				error: null,
				captchaGood: false,
				emailSending: false,
				successfullySent: false
			}
		},
		mounted(){
			if(this.$store.state.user){
				this.emailMsg.fromEmail = JSON.parse(JSON.stringify(this.$store.state.user.email));
				this.emailMsg.fromName = JSON.parse(JSON.stringify(`${this.$store.state.user.name.first} ${this.$store.state.user.name.last}`));
			}
		},
		methods:{
			verifyCaptcha(resp){
				if(resp.length > 200){
					const self = this;
					setTimeout(function(){
						self.captchaGood = true;
					}, 1000);
				}
			},
			async sendEmail(){
				let goodEmail = this.validate('email', this.emailMsg.fromEmail);
				let goodName = this.validate('name', this.emailMsg.fromName);
				if(!goodEmail){this.emailError = "email is invalid"; return;};
				if(!goodName){this.nameError = "name is invalid"; return;};
				this.emailSending = true;
				try{
					const emailSent = await UserService.sendUserEmail(this.emailMsg);
					console.log(emailSent)
					this.emailSending = false;
					if(emailSent.data.ok){
						this.successfullySent = true;
					} else {
						this.error = "Something has gone wrong trying to send your message";
					}
					this.emailMsg.about = null;
					this.emailMsg.message = null;
					if(this.closeBtn){this.$emit('close')};
				} catch(error){
					this.error = error;
					this.emailSending = false;
				}
			},
			validate(type, value){
				const validations = {
					email: {
						re: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
						required: true
					},
					name:{
						re: /^[a-z\s\-\.]+$/i,
						required: true
					}
				}
				if(!value){
					return !validations[type].required
				}
				let valid = validations[type].re.test(value.toLowerCase());
				this[`${type}Error`] = valid ? null : `${type} is invalid`;
				return valid;
			}
		}
	}
</script>
<style scoped>
.email-form-layout{
	border: 1px solid #ddd;
	border-radius: 5px;
}

.close-icon>i{
	cursor: pointer;
	transform: rotate(0deg);
	transition: transform .2s linear;
}
.close-icon>i:hover{
	transform: rotate(90deg);
}

</style>