<template>
  <ion-menu side="start" class="custom-menu" 
      menu-id="custom" content-id="main"
      @ionDidClose="menuclose" @ionWillOpen='menuopen'>
    
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-title>Custom Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item @click='menumodalclose'>cLOSE</ion-item>
      </ion-list>
    </ion-content>
    
  </ion-menu>
</template>
<script>
import { 
  IonContent, 
  IonHeader, 
  IonItem, 
  IonList, 
  IonMenu, 
  IonTitle,
  IonToolbar,
  menuController
} from '@ionic/vue';
import { defineComponent } from 'vue';
  
export default defineComponent({
  components: {
    IonContent, 
    IonHeader, 
    IonItem, 
    IonList, 
    IonMenu, 
    IonTitle, 
    IonToolbar,
  },
  setup() {
    function menumodalclose() {
      menuController.close('custom');
    }
    function menuclose() {
       if (!window.history.state.menu) {
        window.history.back()
      }
    }
    function menuopen() {
      const modalState = {
          modal : true,
          menu : true,
          sheet : true,
          desc : 'fake state for our modal'
      };     
      window.history.pushState( modalState , '', null);
    }
    
    
    return {
      menuopen, menumodalclose, menuclose
    }
  },  
})
</script>