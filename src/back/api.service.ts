import axios from 'axios'
import {TokenService} from "@/services/token.service";
import { toastController } from '@ionic/vue';

const API_URL = process.env.VUE_APP_API_URL

const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

securedAxiosInstance.interceptors.request.use(config => {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${TokenService.getToken()}`,
    }
    return config
})

async function errorToast(errorToastMsg: string): Promise<void>{
      const toast = await toastController
        .create({
          message: errorToastMsg ,
          duration: 1000
        })
      return toast.present();
}
function makeErrorToast( error: any ): void{
    if ( error.response && error.response.status !== 422 ) {
     if ( error.response.data.message ){
        errorToast(error.response.data.message )
      } else {
        errorToast('오류가 발생하였습니다.')
      }
    }
}
securedAxiosInstance.interceptors.response.use(response=>{ return response }, error => {
  if ( error.response && error.response.status === 422 ) {
    errorToast((error.response.data.errors[Object.keys(error.response.data.errors)[0]]))
  }
  return Promise.reject(error)
});

export { securedAxiosInstance, plainAxiosInstance, errorToast,makeErrorToast }