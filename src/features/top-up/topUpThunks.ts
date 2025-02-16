/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userTopUpAPI } from '../../API';

export const userTopUpThunk = createAsyncThunk(
	'topup/topup',
	async (userAmount: { top_up_amount: number }, { rejectWithValue }) => {
		try {
			const response = await userTopUpAPI({
				...userAmount,
				transaction_type: 'TOPUP',
			});
			return response;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue('Terjadi kesalahan saat melakukan top up');
			}
		}
	}
);
