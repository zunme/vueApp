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
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">ONLINE EXPO Way2Expo</ion-title>
          <ion-buttons slot="end">          
            <LeftMenuIcon />
            <RightMenuIcon />
            <CustomMenuIcon />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        
        <div class="sliderDerault_wrap">
         <SliderDefault />  
        </div>

        <ion-button @click="setOpenActionSheet(true)">Show Action Sheet2</ion-button>
        <ion-action-sheet
        :is-open="isOpenRef"
        header="Albums"
        css-class="my-custom-class"
        :buttons="actionSheetButtons"
        @onDidDismiss="setOpenActionSheet(false)"
      >
      </ion-action-sheet>
        
        <AlertTest />
        
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
        <div>
          <router-link to="/test">Default</router-link>  
        </div>
        <div>
          <router-link to="/dashboard">dashboard</router-link>  
        </div>
        
        <ion-button @click="showDialogAlert" full>Show Alert Box</ion-button>
      </div>

      
    </ion-content>   
    
  </ion-page>
</template>

<script lang="ts">
import { Plugins } from "@capacitor/core";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        IonButtons, IonButton ,
        IonActionSheet
       } from '@ionic/vue';
import { defineComponent,ref  } from 'vue';
  
import LeftMenuIcon from "../components/menu/LeftMenuIcon.vue";
import RightMenuIcon from "../components/menu/RightMenuIcon.vue";
import CustomMenuIcon from "../components/menu/CustomMenuIcon.vue";
  
import AlertTest from "../components/AlertTest.vue";
import SliderDefault from  "../components/SliderDefault.vue";

import {  share,heart } from 'ionicons/icons';
  
export default defineComponent({
  name: 'Home',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
               IonButtons, IonButton,
              LeftMenuIcon,RightMenuIcon,CustomMenuIcon ,
              IonActionSheet ,
              AlertTest, SliderDefault
          },
ionViewDidEnter() {
    console.log('Home page did enter');
  },
  ionViewDidLeave() {
    console.log('Home page did leave');
  },
  ionViewWillEnter() {
    console.log('Home page will enter');
  },
  ionViewWillLeave() {
    console.log('Home page will leave');
  },  
  setup() {
    /*
    const state = reactive({
      defaultData : inject('defaultData', {}),
      data :{},
    })
  */
    async function showDialogAlert() {
      await Plugins.Modals.alert({
        title: "Alert",
        message: "This is an example alert box"
      });
    }
    /* ====== action sheet2 ======= */
    const isOpenRef = ref(false);
    const setOpenActionSheet = (state: boolean) => {
      isOpenRef.value = state
      if( state ){
       const modalState = {
            modal : true,
            menu : true,
            sheet : false,
        };     
        window.history.pushState( modalState , 'action', null );   
      }else {
        
        if (!window.history.state.sheet) {
          window.history.back()
        }
      }
     
    };
    const actionSheetButtons = [
        {
          text: 'Delete',
          role: 'destructive',
          icon: share,
          handler: () => {
            console.log('Delete clicked')
          },
        },
        {
          text: 'Favorite',
          icon: heart,
          handler: () => {
            console.log('Favorite clicked')
          },
        },
      ];
    /* ====== / action sheet2 ======= */
    
    /*
    const defaultData = inject('defaultData')
    console.log ( defaultData );
    
    async function login2() {
      console.log ( "login2")
      const login = {userToken:'',password:''}
      try {
        const response = await securedAxiosInstance.post("/auth/login", login);
        const token = response.data.data.token;
        localStorage.setItem("userToken", token);
      } catch (err) {
        console.log(err);
      }      
    }
    login2()    
    */
  
    return {
      showDialogAlert,
      isOpenRef, setOpenActionSheet , actionSheetButtons
    }
  },
});
</script>

<style scoped>

</style>