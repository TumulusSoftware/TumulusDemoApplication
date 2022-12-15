<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Tab 1</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Tab 1</ion-title>
				</ion-toolbar>
			</ion-header>

			<ion-button router-link="/u/owner/assets">List of asset files</ion-button>
			<ion-button router-link="/u/owner/agreements">List of agreements</ion-button>
			<ion-button router-link="/u/owner/assign">Create an authorization</ion-button>
			<ion-button router-link="/u/owner/authorizations">List of authorization</ion-button>
			<ion-button router-link="/u/owner/request">Request an agreement</ion-button>
			<ion-button router-link="/u/owner/states">List of my states</ion-button>
			<ion-button router-link="/u/owner/upload">Upload an asset file</ion-button>

			<ExploreContainer name="Owner Home" />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default defineComponent({
	name: 'Tab1Page',
	components: { ExploreContainer }
});
</script>
