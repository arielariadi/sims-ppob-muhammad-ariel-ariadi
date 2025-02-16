import { createSlice } from '@reduxjs/toolkit';

type UserTokenType = {
	userToken: string | null;
};

const initialState: UserTokenType = {
	userToken: localStorage.getItem('userToken'),
};

const logoutSlice = createSlice({
	name: 'logout',
	initialState,
	reducers: {
		logout: state => {
			state.userToken = null;
			localStorage.removeItem('userToken');
		},
	},
});

export const { logout } = logoutSlice.actions;
export default logoutSlice.reducer;
