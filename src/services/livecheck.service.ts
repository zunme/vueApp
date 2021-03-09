import remotemonster from '@remotemonster/sdk'

const remonConfig = {
    credential: {
      key: "3f2d05e1d964aafbab5e4ebd9055b62cb11fe132bf1660d3d357d321dc57f612",
      serviceId: "bbb1972b-498f-4d71-b0c3-60644fc27dec"
    },
    view: {local: '#dummy', remote: '#dummy'},
    media: {audio: false, video: false}
  };
const LiveService = {
    remonObj : remotemonster({config: remonConfig}),
    checklive: function(): any {
      this.remonObj.fetchCasts().then( result =>{
        console.log (result)
        return result
      })
    }
}
export { LiveService }