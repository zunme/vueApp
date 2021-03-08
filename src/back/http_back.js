import axios from 'axios'
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export async function setStorage(key: string, value: any): Promise<void> {
  await Storage.set({
    key: key,
    value: JSON.stringify(value),
  });
}

export async function getStorage(key: string): Promise<any> {
  const item = await Storage.get({ key: key });
  if (!item.value || item.value !== 'undefined') {
    return Promise.resolve(JSON.parse(item.value));
  } else {
    Promise.resolve({});
  }
}
async function  getToken(){
  const token = await Storage.get({ key: 'token' });
  console.log ( token)
  return token; 
}
async function createInstance() {
	const instance = axios.create();
	return instance;
}
export const securedAxiosInstanceV1 = createInstance();

function createInstanceWithAuth() {
	const instance =  axios.create();
  const token = getToken();
  setStorage('token','1233333')
  console.log (token)
	instance.interceptors.request.use(
		function(config) {
			// Do something before request is sent
			config.headers.Authorization = '';
			return config;
		},
		function(error) {
			// Do something with request error
			return Promise.reject(error);
		},
	);

	// Add a response interceptor
	instance.interceptors.response.use(
		function(response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		function(error) {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			return Promise.reject(error);
		},
	);
	return instance;
}
export const securedAxiosInstance = createInstanceWithAuth();
