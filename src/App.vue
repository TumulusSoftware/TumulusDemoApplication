<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<style scoped="global">
.action-sheet-button-inner::first-letter {
  text-transform:capitalize;
}
</style>
<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>