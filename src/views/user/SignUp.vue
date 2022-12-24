<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Sign Up</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<form @submit.prevent="handleSubmit">
				<ion-list>
					<ion-item>
						<ion-label>First Name</ion-label>
						<ion-input v-model="firstName" placeholder="First Name"></ion-input>
					</ion-item>
					<ion-item>
						<ion-label>Last Name</ion-label>
						<ion-input v-model="lastName" placeholder="Last Name"></ion-input>
					</ion-item>

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

					<ion-label>
						Already have an account?
					</ion-label>
					<ion-button fill="clear" router-link="/user/signin">Sign In</ion-button>
				</ion-list>
			</form>

		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { register } from "@/services/user.service";
import { defineComponent, ref } from 'vue';
import {
	useIonRouter,
	toastController,
	loadingController,
} from '@ionic/vue';
import { User } from '@/interfaces/user';

export default defineComponent({
	setup() {
		const ionRouter = useIonRouter();
		const email = ref('');
		const firstName = ref('');
		const lastName = ref('');
		const password = ref('');
		const handleSubmit = async () => {
			const loader = await loadingController.create({});
			const toast = await toastController.create({ duration: 5000 });
			try {
				await loader.present();
				const user: User = {
					emailAsId: email.value,
					firstName: firstName.value,
					lastName: lastName.value,
					password: password.value
				};
				const { error } = await register(user);
				if (error) throw error;
				ionRouter.push("/user/verify");
			} catch (error: any) {
				toast.message = error.error_description || error.message;
				await toast.present();
			} finally {
				await loader.dismiss();
			}
		};
		return { handleSubmit, email, firstName, password, lastName };
	},
});
</script>

