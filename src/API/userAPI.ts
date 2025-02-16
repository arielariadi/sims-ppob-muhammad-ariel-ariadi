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

export const userTransactionAPI = async (serviceCode: string) => {
	try {
		const response = await axios.post(
			`${apiConfig.BASE_URL}/transaction`,
			{ service_code: serviceCode },
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('userToken')}`,
				},
			}
		);
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

type AmountDataType = {
	top_up_amount: number;
	transaction_type: string;
};

export const userTopUpAPI = async (userAmount: AmountDataType) => {
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

export const userTransactionHistoryAPI = async (
	offset: number,
	limit: number
) => {
	try {
		const response = await axios.get(
			`${apiConfig.BASE_URL}/transaction/history?offset=${offset}&limit=${limit}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('userToken')}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const userUploadProfileImageAPI = async (formData: FormData) => {
	try {
		const response = await axios.put(
			`${apiConfig.BASE_URL}/profile/image`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('userToken')}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

type ProfileDataType = {
	first_name: string;
	last_name: string;
};

export const userUpdateUserProfileAPI = async (
	profileData: ProfileDataType
) => {
	try {
		const response = await axios.put(
			`${apiConfig.BASE_URL}/profile/update`,
			profileData,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('userToken')}`,
					'Content-Type': 'application/json',
				},
			}
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};
