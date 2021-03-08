<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Way 2 EXPO</ion-title>
        <ion-buttons slot="end">
          <LeftMenuIcon />
          <RightMenuIcon />
          <CustomMenuIcon />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div>
        test  
      </div>
    </ion-content>   
    
  </ion-page>
</template>

<script lang="ts">

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons} from '@ionic/vue';
import { defineComponent } from 'vue';
  
import LeftMenuIcon from "../components/menu/LeftMenuIcon.vue";
import RightMenuIcon from "../components/menu/RightMenuIcon.vue";
import CustomMenuIcon from "../components/menu/CustomMenuIcon.vue";

  
export default defineComponent({
  name: 'sample',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, LeftMenuIcon,RightMenuIcon,CustomMenuIcon },
  setup() {
    return {
    }
  },
});
</script>

<style scoped>

</style>