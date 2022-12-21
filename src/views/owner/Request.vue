<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-button router-link="/u/owner" slot="start" fill="clear">&lt;</ion-button>
				<ion-title>Request an Agreement</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-item>
				<ion-label>
					<h3>Request this person as the announcer:</h3>
					<p>{{ announcerText }}</p>
				</ion-label>
				<ion-button slot="end" @click="pickAnnouncer()">
					Pick/Change
				</ion-button>
			</ion-item>

			<ion-item>
				<ion-label>
					<h3>On the State of:</h3>
					<p>{{ stateText }}</p>
				</ion-label>
				<ion-button slot="end" @click="pickState()">
					Pick/Change
				</ion-button>
			</ion-item>
			<ion-item>
				<ion-button slot="start" @click="doSubmit()">
					Send Request
				</ion-button>
			</ion-item>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useIonRouter } from '@ionic/vue';
import {
	authJsonFetch,
	getPickerInput,
	getChainMessage,
	presentAlert,
} from "@/services/main.service";

export default defineComponent({
	name: 'States',
	async setup() {
		const ionRouter = useIonRouter();

		let announcerOption: any = null;
		let announcerText = ref('Click the [Pick/Change] button');
		let stateOption: any = null;
		let stateText = ref('Click the [Pick/Change] button');

		const users = await authJsonFetch("/user");
		const states = await authJsonFetch("/state/list");
		let userOptions = users.map(a => { return { "value": a.id, "text": `${a.firstName} ${a.lastName} (${a.emailAsId})` }; });
		let stateOptions = states.map(a => { return { "value": a.bit, "text": a.state } });

		const pickAnnouncer = async () => {
			announcerOption = await getPickerInput(userOptions);
			announcerText.value = announcerOption.text;
		};
		const pickState = async () => {
			stateOption = await getPickerInput(stateOptions);
			stateText.value = stateOption.text;
		};

		const doSubmit = async () => {
			const bodyObj = { "id": announcerOption.value, "bit": stateOption.value };
			const rtnObj = await authJsonFetch(`/agreement/request`, "POST", bodyObj);
			const msg = getChainMessage(rtnObj);
			await presentAlert("Request has been submitted", msg);
			ionRouter.replace("/u/owner");
		};

		return {
			announcerText,
			stateText,
			pickAnnouncer,
			pickState,
			doSubmit
		};
	},
});
</script>

