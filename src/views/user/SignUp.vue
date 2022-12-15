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
						<ion-button type="submit" >Submit</ion-button>
					</ion-item>

					<ion-item>
						<ion-label slot="start">Already have an account?</ion-label>
						<ion-button slot="" router-link="/start">Sign In</ion-button>
					</ion-item>
				</ion-list>
			</form>

		</ion-content>
	</ion-page>
</template>

<script lang="ts">
/* eslint-disable */
import { useIonRouter } from '@ionic/vue';
import { register } from "@/services/user.service";
import { defineComponent, ref } from 'vue';
import {
  toastController,
  loadingController,
} from '@ionic/vue';
import { User } from '@/interfaces/user';
// import { mapState, mapActions } from "vuex";
// import { Form, Field, ErrorMessage, defineRule } from "vee-validate";
// import { required, email, confirmed, min } from '@vee-validate/rules';

// defineRule('min', min);
// defineRule('required', required);
// defineRule('email', email);
// defineRule('confirmed', confirmed);

export default defineComponent({
	name: 'Tab1Page',
	// components: {
	// 	Form,
	// 	Field,
	// 	ErrorMessage,
	// },
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
				const user:User = {
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
		return { handleSubmit, email, firstName, password, lastName};
	},
});
</script>

