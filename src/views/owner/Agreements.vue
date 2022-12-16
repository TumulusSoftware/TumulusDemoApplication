<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-button router-link="/u/owner" slot="start" fill="clear">&lt;</ion-button>
				<ion-title>Agreements</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-card v-for="item in items" :key="item.agrmId">
				<ion-card-header>
					<ion-card-subtitle>#{{ item.agrmId }} With</ion-card-subtitle>
					<ion-card-title>{{ item["announcer-firstName"] }} {{ item["announcer-lastName"] }}</ion-card-title>
					<ion-card-subtitle>On the state of '{{ item.state }}'</ion-card-subtitle>
				</ion-card-header>
				<ion-card-content>
					Announcer's Email: {{ item["announcer-emailAsId"] }}
					<hr />
					Status: {{ item.status }}
				</ion-card-content>
				<ion-button fill="clear" @click="doDelete(item.agrmId)">DELETE</ion-button>
			</ion-card>

		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { confirmOp, authJsonFetch, getChainMessage, presentAlert } from "@/services/main.service";

export default defineComponent({
	name: 'Agreements',
	async setup() {
		let items = ref([]);

		const loadItems = async () => items.value = await authJsonFetch("/agreement/byOwner");

		const doDelete = async (id: number) => {
			if (!(await confirmOp("Delete"))) return;
			const rtnObj = await authJsonFetch(`/agreement/${id}`, "DELETE");
			const msg = getChainMessage(rtnObj);
			presentAlert("Deletion submitted", msg);
			await loadItems();
		};

		await loadItems();
		return {items, doDelete };
	},
});
</script>

