import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiError = (error: any) => {
	if (axios.isAxiosError(error)) {
		const errorResponse = error.response?.data;

		if (errorResponse?.message) {
			throw new Error(errorResponse.message);
		} else {
			throw new Error('Terjadi kesalahan pada server!');
		}
	}
	throw error;
};
