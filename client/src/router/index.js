import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import Portfolio from '@/components/portfolio/Portfolio.vue'
import PortfolioBuild from '@/components/portfolio/build/PortfolioBuild.vue'
import EditPortfolio from '@/components/portfolio/edit/Portfolio.vue'
import FileUploader from '@/components/universal/FileUploader.vue'
import AuthService from '../services/AuthenticationService.js';
import store from '../store/store.js';

Vue.use(Router)

const router = new Router({
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
    path: '/portfolio/:username/build',
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
});

router.beforeEach(async (to, from, next)=>{
  //check if user token is still vaild, if not, remove user from state
  if(store.state.token){
    try{
      const tokenIsValid = await AuthService.checkToken(store.state.token);
      if(!tokenIsValid.data.ok){
        store.dispatch('setUser', null);
        store.dispatch('setToken', null);
        next();
      } else {
        next();
      }
    } catch(error){
      console.log("ERROR in checking token expiration");
      next();
    }
  } else {
    next();
  }
  
})

export default router


