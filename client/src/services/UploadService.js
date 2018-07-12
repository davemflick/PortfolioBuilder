import Api from '@/services/Api';

export default {
	UploadUserProfileImage(req){
		return Api().post(`user/upload/img`, req,{
			headers: {
				'accept': 'application/json',
				'Accept-Language': 'en-US,en;q=0.8',
				'Content-Type': `multipart/form-data; boundary=${req._boundary}`,
			}
		})// Get user
	}
}
