import { createSlice } from '@reduxjs/toolkit';
import { ShowBalanceType } from './Types';

const initialState: ShowBalanceType = {
	showBalance: false,
};

const showBalanceSlice = createSlice({
	name: 'showBalance',
	initialState,
	reducers: {
		toggleShowBalance: state => {
			state.showBalance = !state.showBalance;
		},
	},
});

export const { toggleShowBalance } = showBalanceSlice.actions;
export default showBalanceSlice.reducer;
