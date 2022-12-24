<template>
	<ion-page>
		<UserHeader title="Viewer" hideHomeLink="true" />
		<ion-content :fullscreen="true">
			<ion-card v-for="item in items">
				<ion-card-header>
					<ion-card-subtitle>#{{ item.authId }}</ion-card-subtitle>
					<ion-card-title>{{ item.fileName }}</ion-card-title>
					<ion-card-subtitle>{{ item.tags }}</ion-card-subtitle>
				</ion-card-header>
				<ion-card-content>
					From
					{{ item['owner-firstName'] }}
					{{ item['owner-lastName'] }}
					({{ item['owner-emailAsId'] }})
					<hr />
					Currently in the state of {{ item.state }}
					<hr />
					Status: {{ item.status }}
				</ion-card-content>
				<ion-button fill="clear" @click="viewAsset(item.authId, item.fileName)">Download</ion-button>
			</ion-card>
			<ion-note v-if="!items.length">
				No records for now.
			</ion-note>

		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { authJsonFetch, viewAsset } from "@/services/main.service";

export default defineComponent({
	async setup() {
		const items = await authJsonFetch("/view/authorized");
		return { items, viewAsset };
	},
});
</script>

