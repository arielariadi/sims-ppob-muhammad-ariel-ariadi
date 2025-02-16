/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	userBalanceAPI,
	userBannersAPI,
	userProfileAPI,
	userServicesAPI,
	userTransactionAPI,
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

export const userTransactionThunk = createAsyncThunk(
	'home/transaction',
	async (serviceCode: string, { rejectWithValue }) => {
		try {
			const response = await userTransactionAPI(serviceCode);

			if (response.status !== 0) {
				return rejectWithValue(response.message || 'Transaksi gagal!');
			}

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

export const userBannersThunk = createAsyncThunk(
	'home/fetchBanners',
	async () => {
		const response = await userBannersAPI();
		return response;
	}
);
