import { createAsyncThunk } from '@reduxjs/toolkit';
import { userTransactionHistoryAPI } from '../../API';

export const userTransactionHistoryThunk = createAsyncThunk(
	'transactionHistory/fetchTransactionHistory',
	async ({ offset, limit }: { offset: number; limit: number }) => {
		const response = await userTransactionHistoryAPI(offset, limit);
		return response;
	}
);
