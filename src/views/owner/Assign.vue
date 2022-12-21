<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-button router-link="/u/owner" slot="start" fill="clear">&lt;</ion-button>
				<ion-title>Assign Authorization on Asset</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-item>
				<ion-label>
					<h3>Authorize this person as the viewer:</h3>
					<p>{{ viewerText }}</p>
				</ion-label>
				<ion-button slot="end" @click="pickViewer()">
					Pick/Change
				</ion-button>
			</ion-item>

			<ion-item>
				<ion-label>
					<h3>Of the asset:</h3>
					<p>{{ assetText }}</p>
				</ion-label>
				<ion-button slot="end" @click="pickAsset()">
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

		let viewerOption: any = null;
		let viewerText = ref('Click the [Pick/Change] button');
		let stateOption: any = null;
		let stateText = ref('Click the [Pick/Change] button');
		let assetOption: any = null;
		let assetText = ref('Click the [Pick/Change] button');

		const users = await authJsonFetch("/user");
		const states = await authJsonFetch("/state/list");
		const assets = await authJsonFetch("/asset/list");
		let userOptions = users.map( (a:any) => { return { "value": a.id, "text": `${a.firstName} ${a.lastName} (${a.emailAsId})` }; });
		let stateOptions = states.map((a:any) => { return { "value": a.bit, "text": a.state } });
		console.log(assets);
		let assetOptions = assets.filter((a:any) => a.assetId > 0).
			map((a:any) => {
				return { "value": a.assetId, "text": a.fileName }
		});
		console.log(assetOptions);

		const pickViewer = async () => {
			viewerOption = await getPickerInput(userOptions);
			viewerText.value = viewerOption.text;
		};
		const pickState = async () => {
			stateOption = await getPickerInput(stateOptions);
			stateText.value = stateOption.text;
		};
		const pickAsset = async () => {
			assetOption = await getPickerInput(assetOptions);
			assetText.value = assetOption.text;
		};

		const doSubmit = async () => {
			const bodyObj = { "id": viewerOption.value, "assetId": assetOption.value, "bit": stateOption.value };
			const rtnObj = await authJsonFetch(`/view/assign`, "POST", bodyObj);
			const msg = getChainMessage(rtnObj);
			await presentAlert("Instruction has been submitted", msg);
			ionRouter.replace("/u/owner");
		};

		return {
			viewerText,
			stateText,
			assetText,
			pickViewer,
			pickState,
			pickAsset,
			doSubmit
		};
	},
});
</script>

