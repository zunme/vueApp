<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Way 2 EXPO</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="search"></ion-icon>
          </ion-button>
          <ion-button @click="openStart">
            <ion-icon :icon="menu"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">ONLINE EXPO Way2Expo</ion-title>
          <ion-buttons slot="end">
            <ion-button>
              <ion-icon :icon="search"></ion-icon>
            </ion-button>            
            <ion-button>
              <ion-icon :icon="menu"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
        <a href="/test2"><p>test</p></a><a href="/test"><p>test</p></a>
        <ion-button @click="showDialogAlert" full>Show Alert Box</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { Plugins } from "@capacitor/core";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonIcon, IonButtons, IonButton,menuController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { search, menu } from 'ionicons/icons'
  
export default defineComponent({
  name: 'Home',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon, IonButtons, IonButton },
  setup() {
    function openStart() {
      menuController.enable(true, 'first');
      menuController.open('first');
    }
    function openEnd() {
      //document.querySelector("ion-menu-controller").open("end");
    }    
    async function showDialogAlert() {
      await Plugins.Modals.alert({
        title: "Alert",
        message: "This is an example alert box"
      });
    }
    return {
      showDialogAlert,openStart,openEnd,
      search,
      menu
    }
  },
});
</script>

<style scoped>

</style>