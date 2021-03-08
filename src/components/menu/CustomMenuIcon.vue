<template>
  <ion-button @click="openMenu">
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
    function openMenu() {
      menuController.enable(true, 'custom');
      menuController.open('custom');
    }  
    return {
      openMenu,menu
    }
  }
}
</script>
