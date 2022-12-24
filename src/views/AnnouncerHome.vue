<template>
	<ion-page>
		<UserHeader title="Announcer" hideHomeLink="true"/>
		<ion-content :fullscreen="true">
			<ion-card v-for="item in items" :key="item.agrmId">
				<ion-card-header>
					<ion-card-subtitle>#{{ item.agrmId }} Request from: </ion-card-subtitle>
					<ion-card-title>{{ item["owner-firstName"] }} {{ item["owner-lastName"] }}</ion-card-title>
					<ion-card-subtitle>On the state of '{{ item.state }}'</ion-card-subtitle>
				</ion-card-header>
				<ion-card-content>
					Announcer's Email: {{ item["owner-emailAsId"] }}
					<hr />
					Status: {{ item.status }}
				</ion-card-content>
				<ion-button fill="clear" :disabled="item.status.includes('EFFECTIVE')"
					@click="doAgree(item.agrmId)">Agree</ion-button>
					<ion-button fill="clear" :disabled="item.status.includes('ANNOUNCED') || item.status.includes('REJECTED')"
					@click="doReject(item.agrmId)">Reject</ion-button>
				<ion-button fill="clear" :disabled="item.status != 'EXISTING; EFFECTIVE; '"
					@click="doAnnounce(item.agrmId)">Announce</ion-button>

			</ion-card>
			<ion-note v-if="!items.length">
				No records for now.
			</ion-note>

		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { confirmOp, authJsonFetch, getChainMessage, presentAlert } from "@/services/main.service";
import UserHeader from '@/components/UserHeader.vue';

export default defineComponent({
	components: {UserHeader},
	async setup() {
		let items = ref([]);

		const loadItems = async () => items.value = await authJsonFetch("/agreement/byAnnouncer");

		const doAgree = async (id: number) => {
			if (!(await confirmOp("Agree"))) return;
			const bodyObj = { "id": id };
			const rtnObj = await authJsonFetch(`/agreement/agree`, "PUT", bodyObj);
			const msg = getChainMessage(rtnObj);
			await presentAlert("Operation submitted", msg);
			await loadItems();
		};

		const doReject = async (id: number) => {
			if (!(await confirmOp("Reject"))) return;
			const bodyObj = { "id": id };
			const rtnObj = await authJsonFetch(`/agreement/reject`, "PUT", bodyObj);
			const msg = getChainMessage(rtnObj);
			await presentAlert("Operation submitted", msg);
			await loadItems();
		};

		const doAnnounce = async (id: number) => {
			if (!(await confirmOp("Announce"))) return;
			const bodyObj = { "id": id };
			const rtnObj = await authJsonFetch(`/agreement/announce`, "PUT", bodyObj);
			const msg = getChainMessage(rtnObj);
			await presentAlert("Operation submitted", msg);
			await loadItems();
		};

		await loadItems();
		return { items, doAgree, doReject, doAnnounce};
	},
});
</script>

