import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import Expos from '../views/Expos.vue'
import Expo from '../views/Expo.vue'
import Booth from '../views/Booth.vue'

import UserBoard from '../views/UserBoard.vue'

import Test from '../views/Test.vue'
import Fallback from '../views/Fallback.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'intpage',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/dashboard',
    name: 'userboard',
    component: UserBoard,
    meta: {
        requiresAuth: true
    }
  },
  {
      path: '/login',
      name: 'login',
      component: Login,
      props: true,
      meta: {
          guest: true
      }
  },
  {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
          guest: true
      }
  },
  
  {
    path: '/expos',
    name: 'expos',
    component: Expos
  },
  {
    path: '/expo/:expocode',
    name: 'expos',
    component: Expo
  }, 
  {
    path: '/booth/:expocode/:boothid',
    name: 'boothWithCode',
    component: Booth
  },  
  {
    path: '/booth/:boothid',
    name: 'boothWithId',
    component: Booth
  },
  
  {
      path: '/:pathMatch(.*)*',
      //redirect: "/404"
        name: 'Fallback',
        component: Fallback
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('access_token') == null) {
            next({
                name: 'login',
                params: { nextUrl: to.fullPath },
                replace: true
            })
        } else {
          /*
            const user = JSON.parse( (localStorage.getItem('user')||'' ) )
            if(to.matched.some(record => record.meta.is_admin)) {
                if(user.is_admin == 1){
                    next()
                }
                else{
                    next({ name: 'userboard'})
                }
            }else {
                next()
            }
            */
          next()
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('access_token') == null){
            next()
        }
        else{
            next({
                name: 'intpage',
            })
        }
    }else {
        next()
    }
})
export default router
