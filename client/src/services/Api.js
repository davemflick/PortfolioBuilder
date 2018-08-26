import axios from 'axios';
import store from '@/store/store'

export default () => {
	return axios.create({
		//baseURL: `http://porteloper.net/`
		baseURL: `http://localhost:8081/`
	});
}