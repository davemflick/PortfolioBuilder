<template>
	<v-card class="pa-2 text-xs-center" id="image-card">
		<img class="img-responsive" v-if="portfolio.profilePicture.length > 0"  :src="serverImageHost + portfolio.profilePicture.find((p)=>{return p.isMain}).path" />
		<img class="img-responsive" v-else :src="defaultProfileImg" />
		<br>
		<div class="other-portfolios" v-if="portfolio.otherProfiles">
			<a class="op-link mx-2" v-if="portfolio.otherProfiles.github" :href="portfolio.otherProfiles.github" target="_blank"><i class="fa fa-github fa-2x"></i></a>
			<a class="op-link mx-2" v-if="portfolio.otherProfiles.linkedin" :href="portfolio.otherProfiles.linkedin" target="_blank"><i class="fa fa-linkedin fa-2x"></i></a>
			<a class="op-link mx-2" v-if="portfolio.otherProfiles.otherPortfolio" :href="portfolio.otherProfiles.otherPortfolio" target="_blank"><i class="fa fa-user fa-2x"></i></a>
		</div>
		<div v-if="portfolio.canEmail">
			<v-btn flat color="primary" @click="$emit('showEmail')">Contact Me</v-btn>
		</div>
		<div v-if="portfolio.resume">
			<v-btn color="primary" :href="portfolio.resume" target="_blank">View Resume</v-btn>
		</div>
	</v-card>
</template>

<script>
	import defaultProfileImg from '@/assets/images/emptyProfile.png';

	export default{
		props:['portfolio'],
		data(){
			return {
				defaultProfileImg
			}
		}
	}
</script>
<style scoped>

#image-card{
	position: absolute;
	top: -155px;
	box-shadow: none;
	border-top-left-radius: 7px;
	border-top-right-radius: 7px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-content: center;
	align-items: center;
}

img.img-responsive{
	max-width: 100%;
	border-radius: 7px;
}

.v-card>:first-child:not(.v-btn):not(.v-chip).img-responsive {
	border-top-left-radius: 7px;
	border-top-right-radius: 7px;
}

.op-link{
	outline: none;
	text-decoration: none;
}
.op-link .fa-github{
	color: #202529;
}
.op-link .fa-linkedin{
	color: #006CAC;
}
.op-link .fa-user{
	color: #243641;
}

</style>
