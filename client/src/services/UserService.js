import Api from '@/services/Api';

export default {
	updateUserInfo(req){
		return Api().put(`user/update`, req)// Get user
	},

	sendUserEmail(req){
		return Api().post('/mailer/send', req)
	}
}
