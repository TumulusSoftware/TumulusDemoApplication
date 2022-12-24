<template>
	<ion-page>
		<UserHeader title="States"/>
		<ion-content :fullscreen="true">
			<ion-card v-for="item in items" :key="item.bit">
				<ion-card-header>
					<ion-card-subtitle>#{{ item.bit }} </ion-card-subtitle>
					<ion-card-title>{{ item["state"] }} </ion-card-title>
				</ion-card-header>
				<ion-card-content>
					Active? {{ item.active }}
					<hr />
					Number of Announcements: {{ item.announcementCount }}
					<hr />
					Threshold: {{ item.threshold }}
				</ion-card-content>
				<ion-button fill="clear" @click="setThreshold(item.bit)">SET THRESHOLD</ion-button>
				<ion-button fill="clear" @click="doDelete(item.bit)">RESET</ion-button>
			</ion-card>
			<ion-note v-if="!items.length">
				No records for now.
			</ion-note>

		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import {
	confirmOp,
	authJsonFetch,
	getChainMessage,
	presentAlert,
	getAlertInputs
} from "@/services/main.service";

export default defineComponent({
	async setup() {
		let items = ref(<any>[]);

		const loadItems = async () => items.value = await authJsonFetch("/state/list");

		const doDelete = async (id: number) => {
			if (!(await confirmOp("Reset"))) return;
			const rtnObj = await authJsonFetch(`/state/${id}`, "DELETE");
			const msg = getChainMessage(rtnObj);
			await presentAlert("Reset submitted", msg);
			await loadItems();
		};

		const setThreshold = async (id: number) => {
			const inputs = [{ name: 'newThreshold', type: 'number', placeholder: 'New threshold', min: 1, }];
			const alertInput = await getAlertInputs(inputs, "Set threshold", "", "");
			if (alertInput == null) return;
			const newThreshold = alertInput.newThreshold;
			if (!(await confirmOp("Change"))) return;
			const bodyObj = { "bit": id, "value": newThreshold };
			const rtnObj = await authJsonFetch(`/state/threshold`, "PUT", bodyObj);
			const msg = getChainMessage(rtnObj);
			await presentAlert("Instruction of setting threshold has been submitted", msg);
			await loadItems();
		};

		await loadItems();
		return { items, doDelete, setThreshold };
	},
});
</script>
