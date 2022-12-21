<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Owner</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-button router-link="/u/owner/assets">List of asset files</ion-button>
			<ion-button router-link="/u/owner/agreements">List of agreements</ion-button>
			<ion-button router-link="/u/owner/assign">Assign Authorization on Asset</ion-button>
			<ion-button router-link="/u/owner/authorizations">List of authorization</ion-button>
			<ion-button router-link="/u/owner/request">Request an agreement</ion-button>
			<ion-button router-link="/u/owner/states">List of my states</ion-button>
			<ion-button router-link="/u/owner/upload">Upload an asset file</ion-button>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'OwnerHome',
	components: {  }
});
</script>
