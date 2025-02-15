import { createSlice } from '@reduxjs/toolkit';

type ShowPasswordState = {
	showPassword: boolean;
	showConfirmPassword: boolean;
};

const initialState: ShowPasswordState = {
	showPassword: false,
	showConfirmPassword: false,
};

const showPasswordSlice = createSlice({
	name: 'showPassword',
	initialState,
	reducers: {
		toggleShowPassword: state => {
			state.showPassword = !state.showPassword;
		},
		toggleShowConfirmPassword: state => {
			state.showConfirmPassword = !state.showConfirmPassword;
		},
	},
});

export const { toggleShowPassword, toggleShowConfirmPassword } =
	showPasswordSlice.actions;
export default showPasswordSlice.reducer;
