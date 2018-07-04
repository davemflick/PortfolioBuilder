import Api from '@/services/Api';

export default {
	findPortfolio(req){
		return Api().get(`portfolio/${req}`)// Get user
	},

	updatePortfolio(id, req){
		return Api().put(`portfolio/update/${id}`, req)
	},

	addUserProject(portfolioId, req){
		return Api().post(`project/add/${portfolioId}`, req);
	}
}
