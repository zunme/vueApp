<template>
  <base-layout
    :page-title="state.loaded ? state.title : 'LoadingIcon'"
  >
    
    <div class="loading_wrap" v-if =" state.loaded === null ">
      <div class="loading_inner">
        <ion-spinner name="dots"></ion-spinner>
      </div>
    </div>
    <div class="none_data_wrap" v-if ="state.loaded === false ">
      <div class="none_data_inner">
        Could not find DATA    
      </div>
    </div>
    
    
  <!-- Scrollable Segment -->
<template v-slot:content-footer>
  <ion-toolbar color="light" class="expo_toolbar">    
    <ion-segment scrollable value="home" mode="md" @ionChange="segmentChanged($event)" >
      <ion-segment-button value="home">
        <ion-icon :icon="videocam" v-if ="state.isLiveOn"></ion-icon>
        <ion-icon :icon="videocamOff" v-else></ion-icon>
      </ion-segment-button>
      <ion-segment-button value="info">
        <ion-label>소개</ion-label>
      </ion-segment-button>
      <ion-segment-button value="booth">
        <ion-label>부스</ion-label>
      </ion-segment-button>
      <ion-segment-button value="product">
       <ion-label>전시상품</ion-label>
      </ion-segment-button>
      <ion-segment-button value="guide">
        <ion-label>출품안내</ion-label>
      </ion-segment-button>
    </ion-segment>
  </ion-toolbar>
</template>    

  </base-layout>
</template>

<script lang="ts">


import { defineComponent,reactive } from 'vue';
import {
  IonSpinner,
  IonSegment, IonSegmentButton, IonToolbar, IonLabel,IonIcon
} from "@ionic/vue";  
import { videocam,videocamOff } from 'ionicons/icons';  
export default defineComponent({
  name: 'expo',
  components: {  IonSpinner,IonSegment, IonSegmentButton, IonToolbar,IonLabel,IonIcon },
  setup() {
    const state = reactive({
      loaded : null,
      title : '',
      isLiveOn : false,
    })
    function segmentChanged(ev: CustomEvent) {
      console.log('Segment changed', ev);
    }    
    return {
      state,
      videocam, videocamOff,
      segmentChanged,     
    }
  },
});
</script>

<style scoped>
  ion-tab-bar {
    display: flex;
    overflow-x: scroll;
    ion-tab-button {
        display: inline-block !important;
        min-width: 100px !important;
        width: auto !important;
    }
  }
</style>