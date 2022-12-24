<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Tumulus</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Start</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-item>
				<ion-button router-link="/user/signIn">Sign In</ion-button>
			</ion-item>
			<ion-item>
				<ion-button router-link="/user/signUp">Sign Up</ion-button>
			</ion-item>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
// import { useRouter } from 'vue-router';

console.log(process.env.VUE_APP_MY_ENV_VARIABLE);

export default defineComponent({
	name: 'StartPage',
	components: { ExploreContainer },
	setup() {
	},
	// setup() {
	// 	const router = useRouter();
	// 	return { router };
	// },

});
</script>

