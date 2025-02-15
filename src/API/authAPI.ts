import axios from 'axios';
import apiConfig from './api-config/config';
import { handleApiError } from './error-helper/handle-api-error';

type UserData = {
	email: string;
	first_name: string;
	last_name: string;
	password: string;
};

export const registerUserAPI = async (userData: UserData) => {
	try {
		const response = await axios.post(
			`${apiConfig.BASE_URL}/registration`,
			userData
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};
