import Api from '@/services/Api';

export default {
	register(req){
		return Api().post('register', req);//register = endpoint
	},
	login(req){
		return Api().post('login', req);//register = endpoint
	},
	checkToken(token){
		return Api().get('/authenticate',{
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': token
			}
		})
	}
}
