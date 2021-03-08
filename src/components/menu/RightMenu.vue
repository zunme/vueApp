<template>
  <ion-menu side="end" type="push" content-id="main"
      @ionDidClose="menuclose" @ionWillOpen='menuopen'>  
    <ion-header>
      <ion-toolbar color="danger">
        <ion-title>End Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
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
      window.history.pushState( modalState , '', null );
    }
    
    
    return {
      menuopen, menuclose
    }
  },  
})
</script>