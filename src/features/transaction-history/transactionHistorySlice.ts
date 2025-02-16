import { createSlice } from '@reduxjs/toolkit';
import { userTransactionHistoryThunk } from './transactionHistoryThunks';

type TransactionHistoryType = {
	invoice_number: string;
	transaction_type: string;
	description: string;
	total_amount: number;
	created_on: string;
};

type TransactionHistoryState = {
	transactionHistory: TransactionHistoryType[];
	offset: number;
	limit: number;
	loading: boolean;
	error: string | null;
};

const initialState: TransactionHistoryState = {
	transactionHistory: [],
	offset: 0,
	limit: 5,
	loading: false,
	error: null,
};

const transactionHistorySlice = createSlice({
	name: 'transaction-history',
	initialState,
	reducers: {
		increaseOffset: state => {
			state.offset += state.limit;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(userTransactionHistoryThunk.pending, state => {
				state.loading = true;
			})
			.addCase(userTransactionHistoryThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.transactionHistory = [
					...state.transactionHistory,
					...action.payload.data.records,
				];
			})
			.addCase(userTransactionHistoryThunk.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.error.message || 'Gagal mengambil riwayat transaksi!';
			});
	},
});

export const { increaseOffset } = transactionHistorySlice.actions;
export default transactionHistorySlice.reducer;
