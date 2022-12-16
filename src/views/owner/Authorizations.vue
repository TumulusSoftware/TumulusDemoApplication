<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-button router-link="/u/owner" slot="start" fill="clear">&lt;</ion-button>
        <ion-title>Authorizations</ion-title>
      </ion-toolbar>
    </ion-header>
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

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { confirmOp, authJsonFetch, getChainMessage, presentAlert } from "@/services/main.service";

export default defineComponent({
  name: 'Authorizations',
  async setup() {
    let items = ref([]);
    
    const loadItems = async () => items.value = await authJsonFetch("/view/list");

    const doDelete = async (id: number) => {
      if (!(await confirmOp("Delete"))) return;
      const rtnObj = await authJsonFetch(`/view/${id}`, "DELETE");
      const msg = getChainMessage(rtnObj);
      presentAlert("Deletion submitted", msg);
      await loadItems();
    };

    await loadItems();
    return { items, doDelete };
  },
});
</script>

