<template>
  <ion-menu side="start" menu-id="first" content-id="main"
      @ionDidClose="menuclose" @ionWillOpen='menuopen' @ionDidOpen='changehistory'>    
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Start Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item>Menu Item</ion-item>
        <ion-item v-if ="state.isLogin" @click="logout">LOGOUT</ion-item>
        <ion-item v-else @click="gotolink('/login')">
          LOG IN
        </ion-item>
        
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
  menuController,
} from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
//import { useRouter } from 'vue-router';
import router from "../../router"
  
import {TokenService} from "../../services/token.service";
import {axiosInstance,errorToast} from "../../services/apiv3.service";
  
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
    const state = reactive({
      isLogin : (TokenService.getToken()) ? true:false,
      routed : false,
    })
    
    function menuclose() {
      if (!window.history.state.menu && !state.routed) {
        console.log( "history back : left menu" )
        window.history.back()
      }
    }
    function menuopen() {
      state.isLogin =  (TokenService.getToken()) ? true:false
      state.routed = false
    }
    const changehistory= () => {
      const modalState = {
          modal : true,
          menu : false,
          sheet : true,
          desc : 'fake state for our modal'
      };      
      window.history.pushState( modalState , '', null );      
    }
    const logout=() =>{
        axiosInstance.post('/api/logout',{}).then(() => {
          state.isLogin =false;
          TokenService.removeToken();
          TokenService.removeData('user')
          state.routed = true
          menuController.close();
          router.push('/')
        }).catch( () =>{
          errorToast('오류가 발생하였습니다.')
        })
    }
    const gotolink= (url) => {
     // window.history.replaceState()
       state.routed = true
       menuController.close();
       router.push(url)
    }
    return {
      state, menuopen,changehistory, menuclose, logout,gotolink
    }
  },  
})
</script>
