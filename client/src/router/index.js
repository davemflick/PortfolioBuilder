import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import Portfolio from '@/components/portfolio/Portfolio.vue'
import PortfolioBuild from '@/components/portfolio/PortfolioBuild.vue'
import EditPortfolio from '@/components/portfolio/Edit/Portfolio.vue'
import FileUploader from '@/components/universal/FileUploader.vue'

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
    },
    {
      path: '/portfolio/:username?',
      name: 'Portfolio',
      component: Portfolio
    },
    {
      path: '/portfolio/:username/build/:stage',
      name: 'PortfolioBuild',
      component: PortfolioBuild
    },
    {
      path: '/portfolio/:username/edit',
      name: 'EditPortfolio',
      component: EditPortfolio
    },
    {
      path: '/file-uploader',
      name: 'FileUploader',
      component: FileUploader
    }
  ]
})
