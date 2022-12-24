<template>
	<ion-page>
		<UserHeader title="Owner" hideHomeLink="true"/>
		<ion-content :fullscreen="true">
			<ion-list>

				<ion-item><ion-button router-link="/u/owner/assets">List of asset files</ion-button></ion-item>
				<ion-item><ion-button router-link="/u/owner/agreements">List of agreements</ion-button></ion-item>
				<ion-item><ion-button router-link="/u/owner/assign">Assign Authorization on Asset</ion-button></ion-item>
				<ion-item><ion-button router-link="/u/owner/authorizations">List of authorization</ion-button></ion-item>
				<ion-item><ion-button router-link="/u/owner/request">Request an agreement</ion-button></ion-item>
				<ion-item><ion-button router-link="/u/owner/states">List of my states</ion-button></ion-item>
				<ion-item><ion-button router-link="/u/owner/upload">Upload an asset file</ion-button></ion-item>
			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserHeader from '@/components/UserHeader.vue';

export default defineComponent({
	name: 'OwnerHome',
	components: {UserHeader},
});
</script>
