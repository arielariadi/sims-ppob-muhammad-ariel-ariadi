import { createSlice } from '@reduxjs/toolkit';
import { registerUserThunk } from './authThunks';

interface RegistrationState {
	loading: boolean;
	error: string | null;
	success: string | null;
	userInfo: string | null;
	userToken: string | null;
}

const initialState: RegistrationState = {
	loading: false,
	error: null,
	success: null,
	userInfo: null,
	userToken: null,
};

const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(registerUserThunk.pending, state => {
				state.loading = true;
				state.error = null;
				state.success = null;
			})
			.addCase(registerUserThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.success = action.payload.message;
			})
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.addCase(registerUserThunk.rejected, (state, action: any) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Registration failed';
				state.success = null;
			});
	},
});

export default registrationSlice.reducer;
