import axios from 'axios'
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const API_URL = 'https://localhost:3000'
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
async function setObject() {
  await Storage.set({
    key: 'user',
    value: JSON.stringify({
      id: 1,
      name: 'Max'
    })
  });
}
async function getObject() {
  const ret = await Storage.get({ key: 'user' });
  const user = JSON.parse(ret.value);
  if ( user == null ){
    setObject()
  }
  console.log ( user )
}

securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  const toKen = getObject();
  console.log ( toKen )
  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': localStorage.csrf
    }
  }
  return config
})
securedAxiosInstance.interceptors.response.use(null, error => {
  if (
    error.response &&
    error.response.config &&
    error.response.status === 401
  ) {
    return plainAxiosInstance
      .post('/refresh', {}, { headers: { 'X-CSRF-TOKEN': localStorage.csrf } })
      .then(response => {
        localStorage.csrf = response.data.csrf
        localStorage.signedIn = true
        const retryConfig = error.response.config
        retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf
        return plainAxiosInstance.request(retryConfig)
      })
      .catch(error => {
        delete localStorage.csrf
        delete localStorage.signedIn
        location.replace('/')
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(error)
  }
})
export { securedAxiosInstance, plainAxiosInstance }