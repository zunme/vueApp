<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
            :default-href="pageDefaultBackLink"
          ></ion-back-button>
        </ion-buttons>
        
        <ion-title>

          <template v-if =" pageTitle == 'LoadingIcon' " >
            <ion-spinner name="dots"></ion-spinner>
          </template>
          <template v-else >
            {{ pageTitle }}
          </template>

        </ion-title>

        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
          
          <LeftMenuIcon />
          <RightMenuIcon />
          <CustomMenuIcon />          
          
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
    <ion-footer>
      <slot name="content-footer"></slot>
    </ion-footer>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonSpinner,
} from "@ionic/vue";
  
import LeftMenuIcon from "../menu/LeftMenuIcon.vue";
import RightMenuIcon from "../menu/RightMenuIcon.vue";
import CustomMenuIcon from "../menu/CustomMenuIcon.vue";
  
export default {
  props: {
    pageTitle : {
      type : String,
      default : ''
    },
    pageDefaultBackLink : {
      type : String,
      default : '/home'
    }
  },
  components: {
    IonPage,
    IonHeader,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonSpinner,
    LeftMenuIcon,RightMenuIcon,CustomMenuIcon
  },
};
</script>