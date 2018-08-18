import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import Portfolio from '@/components/portfolio/Portfolio.vue'
import PortfolioBuild from '@/components/portfolio/build/PortfolioBuild.vue'
import EditPortfolio from '@/components/portfolio/edit/Portfolio.vue'
import Contact from '@/components/Contact.vue'
import AuthService from '../services/AuthenticationService.js';
import store from '../store/store.js';

Vue.use(Router)

const router = new Router({
	mode: "history",
  routes: [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {title: 'Porteloper'}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {title: 'Porteloper - Login'}
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {title: 'Porteloper - Sign Up'}
  },
  {
    path: '/portfolio/:username?',
    name: 'Portfolio',
    component: Portfolio,
    meta: {title: 'Portfolio - '}
  },
  {
    path: '/portfolio/:username/build',
    name: 'PortfolioBuild',
    component: PortfolioBuild,
    meta: {title: 'Build Portfolio -'}
  },
  {
    path: '/portfolio/:username/edit',
    name: 'EditPortfolio',
    component: EditPortfolio,
    meta: {title: 'Edit Portfolio -'}
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {title: 'Porteloper - Contact'}
  }
  ]
});

router.beforeEach(async (to, from, next)=>{
  //Change title
  let isUser = to.params.username;
  document.title = isUser ? `${to.meta.title} ${to.params.username}` : to.meta.title;
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


