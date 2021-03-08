<template>
  <ion-button @click="openLeftMenu">
    <ion-icon :icon="menu"></ion-icon>
  </ion-button>
</template>

<script>
import { IonIcon, IonButton,menuController } from '@ionic/vue';
import { menu } from 'ionicons/icons'

export default {

  components: {
    IonIcon, IonButton
  },
  setup() {
    function openLeftMenu() {
      menuController.enable(true, 'first');
      menuController.open('first');
    }  
    return {
      openLeftMenu,menu
    }
  }
}
</script>
