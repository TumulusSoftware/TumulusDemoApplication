<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Assets</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">

			<ion-button router-link="/start">Assets</ion-button>

		</ion-content>
	</ion-page>
</template>

<script lang="ts">
			// <!-- <ion-list>
			// 	<ion-item v-for="item in assets">
			// 		{{ item.tags }}
			// 	</ion-item>
			// </ion-list> -->
/* eslint-disable */
import { useIonRouter } from '@ionic/vue';
import { getAssetList } from "@/services/main.service";
import { defineComponent, ref } from 'vue';
import {
	toastController,
	loadingController,
} from '@ionic/vue';

export default defineComponent({
	name: 'assets',
	async setup() {
		const assets = await getAssetList();
		console.log(assets);
		const ionRouter = useIonRouter();
		const veriCode = ref('');
		const handleSubmit = async () => {
			const loader = await loadingController.create({});
			const toast = await toastController.create({ duration: 5000 });
			try {
				await loader.present();
				// const { error } = await verify(veriCode.value);
				// if (error) throw error;
				// ionRouter.push("/u/owner");
			} catch (error: any) {
				toast.message = error.error_description || error.message;
				await toast.present();
			} finally {
				await loader.dismiss();
			}
		};
		return { handleSubmit, veriCode, assets };
	},
});
</script>

