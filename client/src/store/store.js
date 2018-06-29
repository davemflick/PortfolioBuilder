import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	plugins: [createPersistedState()],
	state: {
		user: null,
		userLoggedIn: false
	},
	mutations:{
		setUser(state, user){
			state.user = user;
			state.user ? state.userLoggedIn = true : state.userLoggedIn = false
		}
	},
	actions:{
		setUser({commit}, user){
			commit('setUser', user)
		}
	}
})
