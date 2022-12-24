<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Sign In</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<form @submit.prevent="handleSubmit">
				<ion-list>
					<ion-item>
						<ion-label>Email</ion-label>
						<ion-input v-model="email" name="email" autocomplete type="email"></ion-input>
					</ion-item>
					<ion-item>
						<ion-label>Password</ion-label>
						<ion-input v-model="password" type="password"></ion-input>
					</ion-item>
					<ion-item>
						<ion-button type="submit">Submit</ion-button>
					</ion-item>
				</ion-list>
				<ion-label>
					Don't have an account?
				</ion-label>
				<ion-button fill="clear" router-link="/user/signup">Sign Up</ion-button>
			</form>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { useIonRouter } from '@ionic/vue';
import { login } from "@/services/user.service";
import { defineComponent, ref } from 'vue';
import {
	toastController,
	loadingController,
} from '@ionic/vue';

export default defineComponent({
	name: 'SignIn',
	setup() {
		const ionRouter = useIonRouter();
		const email = ref('');
		const password = ref('');
		const handleSubmit = async () => {
			const loader = await loadingController.create({});
			const toast = await toastController.create({ duration: 5000 });
			try {
				await loader.present();
				const user = await login(email.value, password.value);
				if (user && user.status == "NEW") {
					ionRouter.push("/user/verify");
				} else {
					ionRouter.push("/u/owner");
				}
			} catch (error: any) {
				toast.message = error.error_description || error.message;
				await toast.present();
			} finally {
				await loader.dismiss();
			}
		};
		return { handleSubmit, email, password };
	},
});
</script>

