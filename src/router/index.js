import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home from '@/components/Home'
import Library from '@/components/Task'
import Login from '@/components/auth/Login'
import Registration from '@/components/auth/Registration'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter (to, from, next) {
      store.getters.checkUser ? next() : next('/login')
    }
  },
  {
    path: '/library',
    name: 'library',
    component: Library,
    beforeEnter (to, from, next) {
      store.getters.checkUser ? next() : next('/login')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
