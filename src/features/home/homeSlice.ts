import { createSlice } from '@reduxjs/toolkit';
import {
	userBalanceThunk,
	userBannersThunk,
	userProfileThunk,
	userServicesThunk,
	userTransactionThunk,
} from './homeThunks';

import {
	UserProfileType,
	UserBalanceType,
	UserServicesType,
	UserBannersType,
	UserTransactionType,
} from './Types';

type HomeState = {
	profile: UserProfileType | null;
	balance: UserBalanceType | null;
	services: UserServicesType[];
	banners: UserBannersType[];
	transaction: UserTransactionType | null;
	loading: boolean;
	error: string | null;
};

const initialState: HomeState = {
	profile: null,
	balance: null,
	services: [],
	banners: [],
	transaction: null,
	loading: false,
	error: null,
};

const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(userProfileThunk.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(userProfileThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.profile = action.payload.data;
			})
			.addCase(userProfileThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch profile';
			})
			.addCase(userBalanceThunk.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(userBalanceThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.balance = action.payload.data.balance;
			})
			.addCase(userBalanceThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch balance';
			})
			.addCase(userServicesThunk.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(userServicesThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.services = action.payload.data;
			})
			.addCase(userServicesThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch services';
			})
			.addCase(userBannersThunk.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(userBannersThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.banners = action.payload.data;
			})
			.addCase(userBannersThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch banners';
			})
			.addCase(userTransactionThunk.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(userTransactionThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.transaction = action.payload.data;
			})
			.addCase(userTransactionThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Transaksi gagal!';
			});
	},
});

export default homeSlice.reducer;
