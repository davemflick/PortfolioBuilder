import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'

Vue.use(Router)

export default new Router({
	mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
     {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
