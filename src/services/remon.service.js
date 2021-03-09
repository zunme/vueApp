//import remotemonster from '@remotemonster/sdk'  
/*
const remonConfig = {
    credential: {
      key: "3f2d05e1d964aafbab5e4ebd9055b62cb11fe132bf1660d3d357d321dc57f612",
      serviceId: "bbb1972b-498f-4d71-b0c3-60644fc27dec"
    },
    view: {local: '#dummy', remote: '#dummy'},
    media: {audio: false, video: false}
  };
const boothLives = new remotemonster({config: remonConfig});
function BoothLiveCheck(): any {
  boothLives.fetchCasts().then( result =>{
    if( result.length ){
      console.log( result)
      return result;
    }else {
      console.log ( result )
      return []
    }
  }) ;  
}
export const remon: any = {
  remonConfig : {
    credential: {
      key: "3f2d05e1d964aafbab5e4ebd9055b62cb11fe132bf1660d3d357d321dc57f612",
      serviceId: "bbb1972b-498f-4d71-b0c3-60644fc27dec"
    },
    view: {local: '#dummy', remote: '#dummy'},
    media: {audio: false, video: false}
  },
   getApi() {
        return new remotemonster({config: this.remonConfig})
   },
   live() {
     const api = this.getApi()
     api.fetchCasts().then( result =>{
       console.log (result)
       return result
     })
   }
}

export { BoothLiveCheck }
*/
export function BoothLiveCheck() {
  return 10;
}