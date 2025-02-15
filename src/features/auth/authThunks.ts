import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserAPI } from '../../API';

export const registerUserThunk = createAsyncThunk(
	'auth/register',
	async (
		userData: {
			email: string;
			first_name: string;
			last_name: string;
			password: string;
		},
		{ rejectWithValue }
	) => {
		try {
			const response = await registerUserAPI(userData);
			return response;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.response && error.response?.data?.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
