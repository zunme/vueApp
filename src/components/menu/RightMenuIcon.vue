<template>
  <ion-button @click="openRightMenu">
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
    function openRightMenu() {
      menuController.enable(true, 'end');
      menuController.open('end');
    }  
    return {
      openRightMenu,menu
    }
  }
}
</script>
