<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-button router-link="/u/owner" slot="start" fill="clear">&lt;</ion-button>
        <ion-title>States</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card v-for="item in items" :key="item.bit">
        <ion-card-header>
          <ion-card-subtitle>#{{ item.bit }} </ion-card-subtitle>
          <ion-card-title>{{ item["state"] }} </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Active? {{ item.active }}
          <hr/>
          Number of Announcements: {{ item.announcementCount }}
          <hr/>
          Threshold: {{ item.threshold}}
        </ion-card-content>
        <ion-button fill="clear" @click="setThreshold(item.bit)">SET THRESHOLD</ion-button>
        <ion-button fill="clear" @click="doDelete(item.bit)">RESET</ion-button>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { confirmOp, authJsonFetch, getChainMessage, presentAlert } from "@/services/main.service";

export default defineComponent({
  name: 'States',
  async setup() {
    let items = ref([]);
    
    const loadItems = async () => items.value = await authJsonFetch("/state/list");

    const doDelete = async (id: number) => {
      if (!(await confirmOp("Reset"))) return;
      const rtnObj = await authJsonFetch(`/state/${id}`, "DELETE");
      const msg = getChainMessage(rtnObj);
      presentAlert("Reset submitted", msg);
      await loadItems();
    };

    const setThreshold = async (id: number) => {
      if (!(await confirmOp("Set threshold"))) return;
      const rtnObj = await authJsonFetch(`/state/threshold`, "PUT");
      const msg = getChainMessage(rtnObj);
      presentAlert("Reset submitted", msg);
      await loadItems();
    };

    await loadItems();
    return { items, doDelete, setThreshold };
  },
});
</script>

