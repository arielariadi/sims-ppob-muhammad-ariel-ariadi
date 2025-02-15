/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserAPI, registerUserAPI } from '../../API';

export const registerUserThunk = createAsyncThunk(
	'auth/register',
	async (
		registerData: {
			email: string;
			first_name: string;
			last_name: string;
			password: string;
		},
		{ rejectWithValue }
	) => {
		try {
			const response = await registerUserAPI(registerData);
			return response;
		} catch (error: any) {
			if (error.response && error.response?.data?.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const loginUserThunk = createAsyncThunk(
	'auth/login',
	async (
		loginData: {
			email: string;
			password: string;
		},
		{ rejectWithValue }
	) => {
		try {
			const response = await loginUserAPI(loginData);

			localStorage.setItem('userToken', response.data.token);
			return response;
		} catch (error: any) {
			if (error.response && error.response?.data?.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
