import axios from 'axios';
import apiConfig from './api-config/config';
import { handleApiError } from './error-helper/handle-api-error';

type RegisterData = {
	email: string;
	first_name: string;
	last_name: string;
	password: string;
};

type LoginData = {
	email: string;
	password: string;
};

export const registerUserAPI = async (userData: RegisterData) => {
	try {
		const response = await axios.post(
			`${apiConfig.BASE_URL}/registration`,
			userData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const loginUserAPI = async (userData: LoginData) => {
	try {
		const response = await axios.post(`${apiConfig.BASE_URL}/login`, userData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};
