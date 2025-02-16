import { createSlice } from '@reduxjs/toolkit';
import {
	userBalanceThunk,
	userBannersThunk,
	userProfileThunk,
	userServicesThunk,
} from './homeThunks';

import {
	UserProfileType,
	UserBalanceType,
	UserServicesType,
	UserBannersType,
} from './Types';

type HomeState = {
	profile: UserProfileType | null;
	balance: UserBalanceType | null;
	services: UserServicesType[];
	banners: UserBannersType[];
	loading: boolean;
	error: string | null;
};

const initialState: HomeState = {
	profile: null,
	balance: null,
	services: [],
	banners: [],
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
			});
	},
});

export default homeSlice.reducer;
