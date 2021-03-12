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
    
    
    
  </base-layout>
</template>

<script lang="ts">


import { defineComponent,reactive } from 'vue';
import {
  IonSpinner,
} from "@ionic/vue";  
 
export default defineComponent({
  name: 'expo',
  components: {  IonSpinner, },
  setup() {
    const state = reactive({
      loaded : null,
      title : '',
    })
    return {
      state
    }
  },
});
</script>

<style scoped>

</style>