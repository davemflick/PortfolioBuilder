<template>
	<v-flex xs12 v-if="certs.length > 0">
		<h2>Certifications</h2>
		<v-layout wrap>
			<v-flex xs6 sm4 md3 
			class="pa-2 text-xs-center single-cert"
			v-for="(cert, i) in certs"
			:key="`project-${i}`" 
			@click="$emit('open', cert)">
			<div class="pa-2">
				<img v-if="cert.picturePath" :src="`http://porteloper.net/${cert.picturePath}`" class="img-responsive" />
				<img v-else :src="defaultCert" class="img-responsive" />
				<p>{{ cert.name }}</p>
			</div>
		</v-flex>
	</v-layout>
</v-flex>
</template>

<script>
	import defaultCert from '@/assets/images/default-cert.png';

	export default{
		props: ['certs'],
		data(){
			return{
				defaultCert
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