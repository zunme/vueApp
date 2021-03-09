<template>
  <div v-if="!state.isLoaded" class="banners_waiting_wrap">
    <ion-spinner name="bubbles"></ion-spinner>
  </div>
  <div v-if="state.isLoaded && state.data" class="banners_wrap">
    <slot name="header">
      <div class="banners_title_wrap" v-if="title">
        <router-link :to="linked" v-if="linked" class="banners_title_link">{{title}}</router-link>
        <div class="banners_title" v-else>{{title}}</div>
      </div>
    </slot>
    <ion-slides pager="true" :options="state.slideOpts" scrollbar='true'>
      <ion-slide v-for="item in state.data" v-bind:key="item.id">
        <img :src=" state.imgHost + item.image_path" />
      </ion-slide>
    </ion-slides>
  </div>
</template>


<script>
import { IonSlides, IonSlide,IonSpinner  } from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
//import { coverFlowslideOpts } from './inc/slider.opt'
import {axiosInstance} from "../services/apiv3.service";

export default defineComponent({
  components: { IonSlides, IonSlide,IonSpinner  },
  props:{
    url : {
      type: String,
      default :''
    },
    title : {
      type: String,
      default :''
    },
    linked : {
      type:String,
      default:''
    }
  },
  setup(props) {
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    const slideOpts = {
      //initialSlide: 1,
      slidesPerView: 1.1,
      speed: 400,
      loop : true,
      spaceBetween : 10,
      autoplay : true,
      centeredSlides : true,
    };
    const state = reactive({
      imgHost : process.env.VUE_APP_IMG_URL ,
      isLoaded:false,
      data : null,
      slideOpts :slideOpts
    })

    if(props.url != ''){
        axiosInstance.get(props.url).then( response=>{
          const data =  response.data.data
          if( data.length == 1 ){
            slideOpts.loop = false;
            slideOpts.autoplay = false;
            slideOpts.slidesPerView = 1;
            state.slideOpts = slideOpts
            state.data = data
            state.isLoaded = true            
          }else if ( data.length > 1){
            state.data = data
            state.isLoaded = true            
          }else state.isLoaded = true;

        })
    }else {
      state.isLoaded = true;
    }
    
    return { state }
  }
});
</script>