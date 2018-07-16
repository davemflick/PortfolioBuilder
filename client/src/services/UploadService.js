import Api from '@/services/Api';

export default {
	UploadUserProfileImage(file, bounds, dbData){
		return Api().post(`user/upload/img`, file, {
			headers: {
				'accept': 'application/json',
				'Accept-Language': 'en-US,en;q=0.8',
				'Boundaries': bounds,
				'dbData': dbData,
				'Content-Type': `multipart/form-data; boundary=${file._boundary}`,
			}
		})// Get user
	}
}
