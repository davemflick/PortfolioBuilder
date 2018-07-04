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
		getBuildStage(state){return state.buildStage;}
	},
	mutations:{
		setUser(state, user){
			state.user = user;
			state.user ? state.userLoggedIn = true : state.userLoggedIn = false
		},
		setBuildStage(state, stage){
			state.buildStage = stage;
		}
	},
	actions:{
		setUser({commit}, user){
			commit('setUser', user)
		},
		setBuildStage({commit}, stage){
			commit('setBuildStage', stage);
		}
	}
})
