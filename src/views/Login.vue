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
        <ion-item>
          <ion-label position="floating">아이디</ion-label>
          <ion-input v-model="state.email"></ion-input>
        </ion-item>
          <ion-item>
            <ion-label position="floating">비밀번호</ion-label>
            <ion-input v-model="state.password" type="password"></ion-input>
          </ion-item>
      </div>
      <div>
        <ion-button expand="block" @click='loginWithToken'>로그인</ion-button>
      </div>
    </ion-content>   
    
  </ion-page>
</template>

<script lang="ts">

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons,
        IonButton,IonLabel, IonInput, IonItem
       } from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import router from "../router"
  
import LeftMenuIcon from "../components/menu/LeftMenuIcon.vue";
import RightMenuIcon from "../components/menu/RightMenuIcon.vue";
import CustomMenuIcon from "../components/menu/CustomMenuIcon.vue";
  
import axios from 'axios'
import {securedAxiosInstance, makeErrorToast} from "../services/api.service";
import {TokenService} from "../services/token.service";
  
export default defineComponent({
  name: 'Login',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, 
               IonButton, IonLabel, IonInput, IonItem,
               LeftMenuIcon,RightMenuIcon,CustomMenuIcon ,
              },
  props:{
    nextUrl : {
      type: String,
      default: '/'
    }
  },
  setup(props) {
    const state = reactive ({
      email : '',
      password:'',
      loginprc : true,
    });
    console.log (props.nextUrl)

    function loginWithToken(){
      const url = process.env.VUE_APP_API_URL
      
      axios.get( url + '/sanctum/csrf-cookie',{}).then(()=>{
        securedAxiosInstance.post('/api/login',{'email': state.email,'password': state.password}).then(response => {
          TokenService.saveToken(response.data.data.token);
          
          securedAxiosInstance.get('/api/me').then( response=>{
              TokenService.saveData( 'user', response.data )
              router.push(props.nextUrl)
          }).catch( error=>{
              //if (error.response.status == 401 )
              TokenService.removeToken();
              TokenService.removeData('user')
              makeErrorToast(error)
          })
          
        }).catch( error =>{
           makeErrorToast(error)
        })
      })
    }

    return {
      state,loginWithToken
    }
  },
});
</script>

<style scoped>

</style>