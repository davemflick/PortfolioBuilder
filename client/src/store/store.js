import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import allSkills from './devicons.json';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	plugins: [createPersistedState()],
	state: {
		user: null,
		userLoggedIn: false,
		allSkills: allSkills
	},
	getters:{
		getUser(state){return state.user;},
		getSkills(state){ return state.allSkills;}
	},
	mutations:{
		setUser(state, user){
			state.user = user;
			state.user ? state.userLoggedIn = true : state.userLoggedIn = false
		},
		updateUser(state, user){
			state.user = user;
		}
	},
	actions:{
		setUser({commit}, user){
			commit('setUser', user)
		},
		updateUser({commit}, user){
			commit('updateUser', user);
		}
	}
})
