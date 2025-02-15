/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk } from './authThunks';

const userToken = localStorage.getItem('userToken')
	? localStorage.getItem('userToken')
	: null;

interface LoginState {
	loading: boolean;
	error: string | null;
	success: string | null;
	userToken: string | null;
}

const initialState: LoginState = {
	loading: false,
	error: null,
	success: null,
	userToken,
};

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(loginUserThunk.pending, state => {
				state.loading = true;
				state.error = null;
				state.success = null;
			})
			.addCase(loginUserThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.message;
				state.userToken = action.payload.data.token;
			})
			.addCase(loginUserThunk.rejected, (state, action: any) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Login failed';
				state.success = null;
			});
	},
});

export default loginSlice.reducer;
