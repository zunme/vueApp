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
      
      <div class="sliderDerault_wrap">
       <SliderDefault url='/api/banner/list/type/mobile_main_header' title="추천박람회" linked="/test" />
      </div>
      
      <TitleBox class="home_liveexponow" title="Live EXPO NOW" v-if="state.vods">
        <template v-slot:content>
          <div class="wrap_horizonal">
            <!-- live -->
            <div class="home_liveexponow_item" v-for="item in state.defaultData.live" v-bind:key="item.booth_id">
              <router-link :to=" '/booth/' + item.booth_id ">
                <div class="home_liveexponow_header"
                     :style="{ backgroundImage: 'url(' + item.img_url + ')' }" >
                  <!--img :src=" state.hostUrl + item.img_url "-->
                  <span class="home_liveexponow_tag live">Live</span>
                </div>
                <div class="home_liveexponow_bottom">
                  <div class="home_liveexponow_title elllipsis">{{item.title}}</div>
                </div>
              
              </router-link>
            </div>
            <!-- vod -->
            <div class="home_liveexponow_item" v-for="item in state.vods" v-bind:key="item.id">
              <a :href="item.mov_url" target="_blank">
                <div class="home_liveexponow_header"
                     :style="{ backgroundImage: 'url(' + item.img_url + ')' }" >
                  <!--img :src=" state.hostUrl + item.img_url "-->
                  <span class="home_liveexponow_tag vod" v-if=" item.type == 'live' ">Live</span>
                  <span class="home_liveexponow_tag vod" v-else>VOD</span>
                </div>
                <div class="home_liveexponow_bottom">
                  <div class="home_liveexponow_title elllipsis">{{item.title}}</div>
                </div>
              </a>
            </div> 
            <!-- /vod -->
          </div>
        </template>
      </TitleBox>
      
<TitleBox class="home_expoing" title="진행중인 박람회" linked="/expos" v-if="state.expos">
    <template v-slot:content>
      <div class="wrap_horizonal">
        <div class="home_expoing_item" v-for="item in state.expos" v-bind:key="item.id">
          <router-link :to=" '/expo/' + item.expo_code ">
                <div class="bgbox home_expoing_header"
                     :style="{ backgroundImage: 'url(' + state.imgHost + item.expo_image_url + ')' }" >
                </div>
                <div class="home_expoing_bottom">
                  <div class="home_expoing_title elllipsis">{{item.expo_name}}</div>
                  <div class="home_expoing_date elllipsis">
                    {{item.expo_open_date}}~{{item.expo_close_date}}
                  </div>
                </div>
          </router-link>
        </div>
      </div>
    </template>
</TitleBox>


<TitleBox class="home_expoing" title="모집중인 박람회" linked="/expos" v-if="state.recrutings">
    <template v-slot:content>
      <div class="wrap_horizonal">
        <div class="home_expoing_item" v-for="item in state.recrutings" v-bind:key="item.id">
          <router-link :to=" '/expo/' + item.expo_code ">
                <div class="bgbox home_expoing_header"
                     :style="{ backgroundImage: 'url(' + state.imgHost + item.expo_image_url + ')' }" >
                </div>
                <div class="home_expoing_bottom">
                  <div class="home_expoing_title elllipsis">{{item.expo_name}}</div>
                  <div class="home_expoing_date elllipsis">
                    {{item.expo_open_date}}~{{item.expo_close_date}}
                  </div>
                </div>
          </router-link>
        </div>
      </div>
    </template>
</TitleBox>


      <!--TitleBox>
        <template v-slot:header>
          <h1>Here might be a page title</h1>
        </template>
      </TitleBox-->
      
      
      <div>
        HOME ....  
      </div>



      <div class="sliderDerault_wrap">
       <SliderDefault url='/api/banner/list/type/mobile_main_header'>
         <template v-slot:header>
          <div class="banner_title_wrap_bottom">
            추천 박람회
           </div>
         </template>
        </SliderDefault>
      </div>      


    </ion-content>   
    
  </ion-page>
</template>

<script lang="ts">

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons
       
       } from '@ionic/vue';
import { defineComponent,reactive,inject } from 'vue';
  
import LeftMenuIcon from "../components/menu/LeftMenuIcon.vue";
import RightMenuIcon from "../components/menu/RightMenuIcon.vue";
import CustomMenuIcon from "../components/menu/CustomMenuIcon.vue";

import {axiosInstance} from "../services/apiv3.service";
  
import SliderDefault from  "../components/SliderDefault.vue";  
import TitleBox from  "../components/TitleBox.vue"; 
  
export default defineComponent({
  name: 'home',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, LeftMenuIcon,RightMenuIcon,CustomMenuIcon,
              SliderDefault,TitleBox
              },
  setup() {
    const state = reactive({
      hostUrl : process.env.VUE_APP_API_URL ,
      imgHost : process.env.VUE_APP_IMG_URL ,
      isLoaded:false,
      vods : null,
      expos : null,
      recrutings : null,
      defaultData : inject('defaultData')
    })

    axiosInstance.get('/api/homedata').then( response=>{
      const data = response.data.data
      state.vods = data.vods
      state.expos = data.expos
      state.recrutings = data.recruting
    });
    /*
    onMounted( ()=>{
       
    })
    */
    return {
      state
    }
  },
});
</script>

<style scoped>

</style>