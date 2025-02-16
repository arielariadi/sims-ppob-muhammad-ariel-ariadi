import { createSlice } from '@reduxjs/toolkit';
import { userUpdateUserProfileThunk } from './accountThunks';
import { userProfileThunk } from '../home/homeThunks';

type AccountState = {
	loading: boolean;
	success: string | null;
	error: string | null;
};

const initialState: AccountState = {
	loading: false,
	success: null,
	error: null,
};

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(userUpdateUserProfileThunk.pending, state => {
				state.loading = true;
				state.error = null;
				state.success = null;
			})
			.addCase(userUpdateUserProfileThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.message;
			})
			.addCase(userUpdateUserProfileThunk.rejected, (state, action) => {
				state.loading = false;
				state.success = null;
				state.error = (action.payload as string) || 'Update profile gagal!';
			})
			.addCase(userProfileThunk.fulfilled, state => {
				state.success = null;
				state.error = null;
			});
	},
});

export default accountSlice.reducer;
