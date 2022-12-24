<template>
	<ion-page>
		<UserHeader title="Authorizations"/>
		<ion-content :fullscreen="true">
			<ion-card v-for="item in items" :key="item.authId">
				<ion-card-header>
					<ion-card-subtitle>#{{ item.authId }} Authorization set up for</ion-card-subtitle>
					<ion-card-title>{{ item["viewer-firstName"] }} {{ item["viewer-lastName"] }}</ion-card-title>
					<ion-card-subtitle>On the state of '{{ item.state }}'</ion-card-subtitle>
				</ion-card-header>
				<ion-card-content>
					Email: {{ item["viewer-emailAsId"] }}
					<hr />
					File name: {{ item["fileName"] }}
					<hr />
					Tags: {{ item["tags"] }}
					<hr />
					Status: {{ item.status }}
				</ion-card-content>
				<ion-button fill="clear" @click="doDelete(item.authId)">DELETE</ion-button>
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
	name: 'Authorizations',
	components: { UserHeader },
	async setup() {
		let items = ref([]);

		const loadItems = async () => items.value = await authJsonFetch("/view/list");

		const doDelete = async (id: number) => {
			if (!(await confirmOp("Delete"))) return;
			const rtnObj = await authJsonFetch(`/view/${id}`, "DELETE");
			const msg = getChainMessage(rtnObj);
			await presentAlert("Deletion submitted", msg);
			await loadItems();
		};

		await loadItems();
		return { items, doDelete };
	},
});
</script>

