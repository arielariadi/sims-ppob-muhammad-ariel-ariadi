import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	userBalanceAPI,
	userBannersAPI,
	userProfileAPI,
	userServicesAPI,
} from '../../API';

export const userProfileThunk = createAsyncThunk(
	'home/fetchProfile',
	async () => {
		const response = await userProfileAPI();
		return response;
	}
);

export const userBalanceThunk = createAsyncThunk(
	'home/fetchBalance',
	async () => {
		const response = await userBalanceAPI();
		return response;
	}
);

export const userServicesThunk = createAsyncThunk(
	'home/fetchServices',
	async () => {
		const response = await userServicesAPI();
		return response;
	}
);

export const userBannersThunk = createAsyncThunk(
	'home/fetchBanners',
	async () => {
		const response = await userBannersAPI();
		return response;
	}
);
