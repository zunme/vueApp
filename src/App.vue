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
import { defineComponent,reactive, provide, onMounted ,onUnmounted } from 'vue';
import leftMenu from './components/menu/Left';
import rightMenu from './components/menu/RightMenu';
import customMenu from './components/menu/CustomMenu';

//import {TokenService} from "./services/token.service";
import remotemonster from '@remotemonster/sdk'  
import axios from "axios";
  
export default defineComponent({
  components: {
    IonRouterOutlet,
    leftMenu,rightMenu,customMenu
  },
  setup() {
    const defaultData = reactive ({
      logined : false,
      live : []
    });
    provide('defaultData', defaultData );
    
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
    
    const boothSimpleInfo = {}
    const remonConfig = {
        credential: {
          key: "3f2d05e1d964aafbab5e4ebd9055b62cb11fe132bf1660d3d357d321dc57f612",
          serviceId: "bbb1972b-498f-4d71-b0c3-60644fc27dec"
        },
        view: {local: '#dummy', remote: '#dummy'},
        media: {audio: false, video: false}
      };
    const boothLives = new remotemonster({config: remonConfig});
    function fnBoothLiveCheck() {
      boothLives.fetchCasts().then( result =>{
        if( result.length ){
          const lives = []
          result.forEach( async (element)=> {
            const idSplit =element.id.split("_");
            if ( idSplit.length == 3  && idSplit[0] =='booth'){
              element['booth_id'] = +idSplit[1];
              element['img_url'] = process.env.VUE_APP_IMG_URL + 'thumb/' + element.id + '.jpg?ver=' + new Date().valueOf()
              if( typeof boothSimpleInfo['booth_' + element.booth_id ] != 'undefined'){
                element['title'] =  boothSimpleInfo['booth_' + element.booth_id ].booth_title
              }else {
                const baseinfo = await axios.get( process.env.VUE_APP_API_URL + '/api/boothSimpleInfo?id=' +  element.booth_id )
                boothSimpleInfo['booth_' + element.booth_id ] = baseinfo.data.data 
                element['title'] =   baseinfo.data.data.booth_title
              }
              lives.push(element)
              }
            })
          defaultData.live = lives
          console.log ( lives)
        }else {
          defaultData.live = []
        }
      }) ;
      
    }
    let intval
    onMounted( ()=>{
      //console.log ( `Bearer ${TokenService.getToken()}` )
        fnBoothLiveCheck();
        intval = setInterval(async function () {
          fnBoothLiveCheck();
        }, 10000);
    })
    onUnmounted(() => {
      clearInterval(intval)
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
a{
  background-color: transparent;
  text-decoration: none;
  color: var(--color) !important;
}  
.custom-menu {
  --width: 90vw;
}
ion-toolbar {
  --ion-toolbar-background : #224275;
}
.elllipsis{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
 
.swiper-slide img{width:100% !important;    max-height: 400px;}

  .bgbox{
    min-width:50px;
    min-height:50px;
  }
/* home live now */
.wrap_horizonal{
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  max-height: 100%;
}
  
.home_liveexponow{
  --boxheight : 200px;
  --boxwidth : 150px;
  --padding : 3px;
  --bgcolor : white;
  --color:black;
  --title-height:34px;
}
.home_liveexponow_item{
    height: var(--boxheight) ;
    width: var(--boxwidth) ;
    padding:var(--padding);
    background-color:var(--bgcolor);
    color:var(--color);
    margin-left:10px;
}
.home_liveexponow_header{
  position: relative;
  width:calc( var(--boxwidth) - var(--padding)*2 );
  min-height:calc( var(--boxheight) - var(--padding)*2 - var(--title-height) );
}
.home_liveexponow_title{
display: flex;
align-items: center;
width: 100%;
height: var(--title-height);
}
.home_liveexponow_tag{
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 12px;
  color: white;

  padding: 3px 6px;
  border-radius: 10px;
  font-weight: 800;
}
.home_liveexponow_tag.vod{
  background-color: #eb445a;
}
.home_liveexponow_tag.live{
  background-color: #3171e0;
}  
/* / home live now */  
</style>