import axios from 'axios';
import apiConfig from './api-config/config';
import { handleApiError } from './error-helper/handle-api-error';

export const userProfileAPI = async () => {
	try {
		const response = await axios.get(`${apiConfig.BASE_URL}/profile`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('userToken')}`,
			},
		});

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const userBalanceAPI = async () => {
	try {
		const response = await axios.get(`${apiConfig.BASE_URL}/balance`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('userToken')}`,
			},
		});

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const userServicesAPI = async () => {
	try {
		const response = await axios.get(`${apiConfig.BASE_URL}/services`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('userToken')}`,
			},
		});

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const userBannersAPI = async () => {
	try {
		const response = await axios.get(`${apiConfig.BASE_URL}/banner`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('userToken')}`,
			},
		});

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

type AmountData = {
	top_up_amount: number;
	transaction_type: string;
};

export const userTopUpAPI = async (userAmount: AmountData) => {
	try {
		const response = await axios.post(
			`${apiConfig.BASE_URL}/topup`,
			{
				...userAmount,
				transaction_type: 'TOPUP',
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('userToken')}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};
