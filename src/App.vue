<template>
  <leftMenu />
  <customMenu />
  <rightMenu />

  <ion-router-outlet id="main"></ion-router-outlet>
</template>

<script>
import { 
  IonRouterOutlet,
  menuController,actionSheetController,alertController
} from '@ionic/vue';
import { defineComponent,reactive, provide, onMounted  } from 'vue';
import leftMenu from './components/menu/Left';
import rightMenu from './components/menu/RightMenu';
import customMenu from './components/menu/CustomMenu';
import {securedAxiosInstance} from "./services/api.service";
import {TokenService} from "./services/token.service";
  
export default defineComponent({
  components: {
    IonRouterOutlet,
    leftMenu,rightMenu,customMenu
  },
  setup() {
    const defaultData = reactive ({
      logined : false,
    });
    provide('defaultData', defaultData );
    
    const loginCheck=()=>{
      if ( TokenService.getToken() ){
            securedAxiosInstance.get('/api/me').then( response=>{
                TokenService.saveData( 'user', response.data )
                defaultData.logined = true;
            }).catch( error=>{
              if (error.response.status == 401 ) {
                TokenService.removeToken();
                TokenService.removeData('user')
              }
            })
      }
    }
  
    loginCheck();
    
    const modalState = {
        modal : true,
        menu : true,
        sheet : true,
        desc : 'fake state for our modal'
    };
    history.pushState(modalState, null);
    window.onpopstate = function(event) {
        console.log ( event.state )
        
        menuController.getOpen().then( ( menu )=>{
          if (menu) {
            const nowState = window.history.state
            nowState.menu = true;
            history.replaceState(nowState, null);
            menuController.close();
          }
        })
        actionSheetController.getTop().then( function (resolvedData){ 
          if ( typeof resolvedData != 'undefined' ){
            actionSheetController.dismiss(resolvedData );
          }
        });
        alertController.getTop().then( function (resolvedData){ 
          if ( typeof resolvedData != 'undefined' ) {
            alertController.dismiss(resolvedData );
          }
        });
    };
    onMounted( ()=>{
      //console.log ( `Bearer ${TokenService.getToken()}` )
    })
  }
});
</script>

<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.custom-menu {
  --width: 90vw;
}
ion-toolbar {
  --ion-toolbar-background : #224275;
}
</style>