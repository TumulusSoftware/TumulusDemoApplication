
<template>
	<ion-page>
		<Suspense>
		<ion-tabs>
				<ion-router-outlet></ion-router-outlet>
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="tab1" href="/u/owner">
					<ion-icon :icon="triangle" />
					<ion-label>Owner</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="tab2" href="/u/announcer">
					<ion-icon :icon="ellipse" />
					<ion-label>Announcer</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="tab3" href="/u/viewer">
					<ion-icon :icon="square" />
					<ion-label>Viewer</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</Suspense>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default defineComponent({
	components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
	setup() {
		return {
			ellipse,
			square,
			triangle,
		}
	}
});
</script>
