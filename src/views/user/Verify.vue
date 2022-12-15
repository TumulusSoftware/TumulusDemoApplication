<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Verify</ion-title>
				<ion-button router-link="/start">Home</ion-button>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<form @submit.prevent="handleSubmit">
				<ion-list>
					<ion-item>
						<ion-label>Verification Code</ion-label>
						<ion-input v-model="veriCode"></ion-input>
					</ion-item>
					<ion-item>
						<ion-button type="submit">Submit</ion-button>
					</ion-item>

				</ion-list>
			</form>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
/* eslint-disable */
import { useIonRouter } from '@ionic/vue';
import { verify } from "@/services/user.service";
import { defineComponent, ref } from 'vue';
import {
	toastController,
	loadingController,
} from '@ionic/vue';

export default defineComponent({
	name: 'SignIn',
	setup() {
		const ionRouter = useIonRouter();
		const veriCode = ref('');
		const handleSubmit = async () => {
			const loader = await loadingController.create({});
			const toast = await toastController.create({ duration: 5000 });
			try {
				await loader.present();
				const { error } = await verify(veriCode.value);
				if (error) throw error;
				ionRouter.push("/u/owner");
			} catch (error: any) {
				toast.message = error.error_description || error.message;
				await toast.present();
			} finally {
				await loader.dismiss();
			}
		};
		return { handleSubmit, veriCode };
	},
});
</script>

