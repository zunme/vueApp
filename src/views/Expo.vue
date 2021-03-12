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
    <ion-segment scrollable value="info" mode="md" @ionChange="segmentChanged($event)" >
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


import { defineComponent,reactive,inject, onMounted } from 'vue';
import {
  IonSpinner,
  IonSegment, IonSegmentButton, IonToolbar, IonLabel
} from "@ionic/vue";   
export default defineComponent({
  name: 'expo',
  components: {  IonSpinner,IonSegment, IonSegmentButton, IonToolbar,IonLabel },
  setup() {
    const state = reactive({
      loaded : null,
      title : '',
      isLiveOn : false,
      info : null,
      booths : null,
      products:null,
      guide : null,
      defaultData : inject('defaultData'),
    })
    function segmentChanged(ev: CustomEvent) {
      console.log('Segment changed', ev);
    }
    onMounted( ()=>{
      console.log ( state.defaultData )
    })
    return {
      state,
      segmentChanged,     
    }
  },
});
</script>

<style scoped>
  ion-tab-bar {
    display: flex;
    overflow-x: scroll;
  }
</style>