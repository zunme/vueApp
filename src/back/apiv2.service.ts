import axios from 'axios'
import {TokenService} from "@/services/token.service";

const API_URL = process.env.VUE_APP_API_URL

const apiv2 = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

export { apiv2 }