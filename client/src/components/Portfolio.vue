<template>
	<h1>Hello </h1>
</template>

<script>
	import AuthenticationService from '@/services/AuthenticationService';
	import appFormPanel from './universal/FormPanel.vue';

	export default{
		data(){
			return {
				user: null
			}
		}
	}
</script>
<style scoped>
.error-alert{
	text-align: center;
	color: #dd1212;
}

</style>