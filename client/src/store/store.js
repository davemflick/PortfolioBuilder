import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import allSkills from './devicon.json';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	plugins: [createPersistedState()],
	state: {
		token: null,
		user: null,
		userLoggedIn: false,
		allSkills: allSkills
	},
	getters:{
		getUser(state){return state.user;},
		getSkills(state){ return state.allSkills;}
	},
	mutations:{
		setToken(state, token){
			state.token = token;
			state.token ? state.userLoggedIn = true : state.userLoggedIn = false
		},
		setUser(state, user){
			state.user = user;
			state.user ? state.userLoggedIn = true : state.userLoggedIn = false
		},
		updateUser(state, user){
			state.user = user;
		}
	},
	actions:{
		setToken({commit}, token){
			commit('setToken', token);
		},
		setUser({commit}, user){
			commit('setUser', user)
		},
		updateUser({commit}, user){
			commit('updateUser', user);
		}
	}
})
