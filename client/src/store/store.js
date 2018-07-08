import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	plugins: [createPersistedState()],
	state: {
		user: null,
		userLoggedIn: false,
		buildStage: null
	},
	getters:{
		getBuildStage(state){return state.buildStage;},
		getUser(state){return state.user}
	},
	mutations:{
		setUser(state, user){
			state.user = user;
			state.user ? state.userLoggedIn = true : state.userLoggedIn = false
		},
		setBuildStage(state, stage){
			state.buildStage = stage;
		},
		updateUser(state, user){
			state.user = user;
		}
	},
	actions:{
		setUser({commit}, user){
			commit('setUser', user)
		},
		setBuildStage({commit}, stage){
			commit('setBuildStage', stage);
		},
		updateUser({commit}, user){
			commit('updateUser', user);
		}
	}
})
