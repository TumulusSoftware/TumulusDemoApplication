<template>
	<ion-page>
		<UserHeader title="Upload an Asset"/>
		<ion-content :fullscreen="true">
			<form @submit.prevent="handleSubmit">
				<ion-list>
					<ion-item>
						<ion-label>File:</ion-label>
						<ion-input name="assetFile" @change="fileChanged" type="file"></ion-input>
					</ion-item>

					<ion-item>
						<ion-label>Tags:</ion-label>
						<ion-input v-model="tags" name="tags" autocomplete type="text"></ion-input>
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
import { ref, defineComponent } from 'vue';
import {
	toastController,
	loadingController,
	useIonRouter
} from '@ionic/vue';
import {
	postFormData,
	getChainMessage,
	presentAlert,
} from "@/services/main.service";

export default defineComponent({
	async setup() {
		const assetFile = ref(<File><unknown>null);
		const tags = ref('');

		const ionRouter = useIonRouter();

		const fileChanged = (event:any) => {
			console.log(event.target.files[0]);
			assetFile.value = event.target.files[0];
		};

		const handleSubmit = async () => {
			const loader = await loadingController.create({});
			const toast = await toastController.create({ duration: 5000 });
			try {
				await loader.present();

				var formData = new FormData();
				formData.append("assetFile", assetFile.value, assetFile.value.name);
				formData.append("tags", tags.value);
				const rtnObj = await postFormData("/asset/upload", formData);
				await loader.dismiss();
				const msg = getChainMessage(rtnObj);
				await presentAlert("File uploaded.  Information has been submitted", msg);
				ionRouter.replace("/u/owner");
			} catch (error: any) {
				await loader.dismiss();
				toast.message = error.error_description || error.message;
				await toast.present();
			}
		};

		return {
			tags,
			fileChanged,
			handleSubmit
		};
	},
});
</script>

