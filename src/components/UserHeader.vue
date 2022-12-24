<template>
	<ion-header>
		<ion-toolbar>
			<ion-button router-link="/u/owner" slot="start" fill="clear" :class="hideHomeLink">&lt;&lt;</ion-button>
			<ion-title>{{ title }}</ion-title>
			<ion-label slot="end">
				{{ user.firstName }} {{ user.lastName }}
			</ion-label>
			<ion-button slot="end" @click="signOut" fill="clear">
				<ion-icon :icon="exitOutline"></ion-icon>
			</ion-button>
		</ion-toolbar>
	</ion-header>

</template>
 
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { logout } from "@/services/user.service";
import { useIonRouter } from '@ionic/vue';
import { exitOutline } from 'ionicons/icons';


export default defineComponent({
	name: 'UserHeader',
	props: {
		title: String,
		hideHomeLink: String
	},
	setup() {
		const user = ref();
		user.value = JSON.parse(localStorage.getItem("user") as string);

		const ionRouter = useIonRouter();
		const signOut = () => {
			logout();
			ionRouter.replace("/start");
		};
		return { signOut, user, exitOutline };
	}
});
</script>
 
<style scoped>
.false {
	display: inline-block;
}

.true {
	display: none;
}
</style>
 