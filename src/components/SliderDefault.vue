<template>
  <div v-if="!state.data">
    NULL
  </div>
  <div v-else>
    <ion-slides pager="true" :options="slideOpts" scrollbar='true'>
      <ion-slide v-for="item in state.data" v-bind:key="item.id">
        <img :src=" state.imgHost + item.img" />
      </ion-slide>
    </ion-slides>
  </div>
</template>


<script>
import { IonSlides, IonSlide } from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
//import { coverFlowslideOpts } from './inc/slider.opt'
  
export default defineComponent({
  components: { IonSlides, IonSlide },
  props:{
    url : {
      type: String,
      default :''
    }
  },
  setup(props) {
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    const state = reactive({
      imgHost : process.env.VUE_APP_API_URL + '/storage/' , 
      data : null
    })
    if(props.url != ''){
      const res = [
        {'id':1, 'img':'banner/1609310014_3NNhEhp1.jpg','url':'/expo'},
        {'id':2, 'img':'banner/1609310014_3NNhEhp1.jpg','url':'/expo'},
        {'id':3, 'img':'banner/1609310014_3NNhEhp1.jpg','url':'/expo'},
      ]
      state.data = res
    }else {
const res = [
        {'id':1, 'img':'banner/1611275157_ZOVmmwAa.jpg','url':'/expo'},
        {'id':2, 'img':'banner/1611275157_ZOVmmwAa.jpg','url':'/expo'},
        {'id':3, 'img':'banner/1611275157_ZOVmmwAa.jpg','url':'/expo'},
      ]
      state.data = res      
    }
    console.log (props.url)
    const slideOpts = {
      //initialSlide: 1,
      slidesPerView: 1.1,
      speed: 400,
      loop : true,
      spaceBetween : 10,
      autoplay : true,
      centeredSlides : true,
    };
    
    //const slideOpts = coverFlowslideOpts
    return { state, slideOpts }
  }
});
</script>