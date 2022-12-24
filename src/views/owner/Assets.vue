<template>
	<ion-page>
		<UserHeader title="Assets"/>
		<ion-content :fullscreen="true">
			<ion-card v-for="item in items" :disabled="item.status != 'BLOCKCHAIN'">
				<ion-card-header>
					<ion-card-subtitle>#{{ item.assetId }}</ion-card-subtitle>
					<ion-card-title>{{ item.fileName }}</ion-card-title>
					<ion-card-subtitle>{{ item.tags }}</ion-card-subtitle>
				</ion-card-header>
				<ion-card-content>
					Status: {{ item.status }}
				</ion-card-content>
				<ion-button fill="clear" :disabled="item.status != 'BLOCKCHAIN'"
					@click="getAsset(item.assetId, item.fileName)">Download</ion-button>
			</ion-card>
			<ion-note v-if="!items.length">
				No records for now.
			</ion-note>

		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { authJsonFetch, getAsset } from "@/services/main.service";

export default defineComponent({
	async setup() {
		const items = await authJsonFetch("/asset/list");
		return { items, getAsset };
	},
});
</script>

