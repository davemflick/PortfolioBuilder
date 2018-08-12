<template>
	<div class="text-xs-center">
		<v-bottom-sheet v-model="emailSheet" persistent>
			<div class="py-3" style="width: 100%; background-color: #fff;">
				<v-container>
					<v-layout row>
						<v-flex xs10>
							<h2 class="text-xs-left mb-2 primary--text">
								Send {{ emailMsg.toUsername }} an Email
							</h2>
						</v-flex>
						<v-flex xs2 class="text-xs-right close-icon">
							<v-icon color="red" @click="$emit('close')">cancel</v-icon>
						</v-flex>
					</v-layout>
					<v-layout wrap class="pa-2 email-form-layout">
						<v-flex xs12 sm6 class="pa-1">
							<v-text-field  v-model="emailMsg.from" label="From" required ></v-text-field>
						</v-flex>
						<v-flex xs12 sm6 class="pa-1">
							<v-text-field  v-model="emailMsg.about" label="About" required ></v-text-field>
						</v-flex>
						<v-flex xs12 class="pa-1">
							<v-textarea  v-model="emailMsg.msg" label="Message" required ></v-textarea>
						</v-flex>
						<v-flex xs12 class="text-xs-right">
							<v-btn flat color="primary">Send</v-btn>
						</v-flex>
					</v-layout>
				</v-container>
			</div>
		</v-bottom-sheet>
	</div>
</template>

<script>
	export default{
		props: ["emailSheet", "user"],
		data(){
			return{
				emailMsg: {
					toUsername: this.user.username,
					toEmail: this.user.email,
					fromEmail: null,
					about: null,
					message: null
				}
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