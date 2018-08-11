<template>
	<div class="text-xs-center">
		<v-bottom-sheet v-model="emailSheet">
			<div class="py-3" style="width: 100%; background-color: #fff;">
				<v-container>
					<h2 class="text-xs-left mb-2 primary--text">
						Send {{ username }} an Email
					</h2>
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
		props: ["emailSheet", "username"],
		data(){
			return{
				emailMsg: {
					from: null,
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

</style>