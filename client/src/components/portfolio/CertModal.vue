<template>
	<v-layout row justify-center v-if="cert">
		<v-dialog max-width="600px" :value="isOpen" @input="$emit('close')">
			<v-card>
				<v-card-title>
					<span class="headline">Certification</span>
				</v-card-title>
				<div class="pa-2 text-xs-center">
					<img v-if="cert.picturePath" :src="`${serverImageHost}${cert.picturePath}`" class="img-responsive" />
					<img v-else :src="defaultCert" class="img-responsive" />
					<h3>
						{{ cert.name }}
					</h3>
					<p v-if="cert.dateObtained"><em>{{ formatDate(cert.dateObtained) }}</em></p>
					<p v-if="cert.about">{{ cert.about }} </p>
				</div>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click="$emit('close')">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
	import defaultCert from '@/assets/images/default-cert.png';
	import moment from 'moment';

	export default{
		props: ['cert', 'isOpen'],
		data(){
			return{
				defaultCert
			}
		},
		methods:{
			formatDate(date){
				return moment(date).format('MM/DD/YYYY');
			}
		}
	}

</script>

<style scoped>
.single-cert>div{
	border: 1px solid #eee;
	border-radius: 2px;
	cursor: pointer;
}
</style>



