import Api from '@/services/Api';

export default {
	register(req){
		return Api().post('register', req);//register = endpoint
	},
	login(req){
		return Api().post('login', req);//register = endpoint
	},
	pullUser(req){
		return Api().get('user', req)// Get user
	}
}
