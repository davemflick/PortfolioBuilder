import Api from '@/services/Api';

export default {
	findPortfolio(req){
		return Api().get(`portfolio/${req}`)// Get user
	}
}