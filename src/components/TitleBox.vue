<template>

    <div class="titled_box">
      <div class="titled_box_inner">
        <div class="titled_box_title_wrap">
          <slot name="header">
            <div class="titled_box_title_inner" v-if="title">
              <router-link :to="linked" v-if="linked" class="banners_title_link">
                <span>{{title}}</span>
                <ion-icon :icon="chevronForward" />
              </router-link>
              <div class="banners_title" v-else>{{title}}</div>
            </div>            
          </slot>
        </div>
        <div class="titled_box_contents_wrap">
          <slot name="content">
          </slot>
        </div>
      </div>
    </div>

</template>
<script>
import { defineComponent } from 'vue';
import { IonIcon} from '@ionic/vue';
  import { chevronForward  } from 'ionicons/icons';
export default defineComponent({
  components: {IonIcon},
  props:{
    title : {
      type: String,
      default :''
    },
    linked : {
      type:String,
      default:''
    }
  },
  setup () {
    return { chevronForward }  
  }
});
</script>
<style>
  .titled_box_title_inner{text-align:left;}
</style>