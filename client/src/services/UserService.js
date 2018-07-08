import Api from '@/services/Api';

export default {
	updateUserInfo(req){
		return Api().put(`user/update`, req)// Get user
	}
}
