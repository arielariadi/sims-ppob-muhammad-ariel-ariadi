import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userTopUpThunk } from './topUpThunks';
import { z } from 'zod';

const topUpValidation = z.object({
	amount: z.coerce.number(),
});

type TopUpState = {
	amount: number;
	balance: number;
	loading: boolean;
	success: string | null;
	error: string | null;
	disabled: boolean;
};

const initialState: TopUpState = {
	amount: 0,
	balance: 0,
	loading: false,
	success: null,
	error: null,
	disabled: true,
};

const topUpSlice = createSlice({
	name: 'topup',
	initialState,
	reducers: {
		setAmount: (state, action: PayloadAction<number>) => {
			const parsed = topUpValidation.safeParse({
				amount: action.payload,
			});

			if (parsed.success) {
				state.amount = action.payload;
				state.disabled = false;
				state.error = null;
			} else {
				state.error = parsed.error.errors[0].message;
				state.disabled = true;
			}
		},
		resetTopUpState: state => {
			state.amount = 0;
			state.success = null;
			state.error = null;
			state.disabled = true;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(userTopUpThunk.pending, state => {
				state.loading = true;
				state.error = null;
				state.success = null;
			})
			.addCase(userTopUpThunk.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.status === 0) {
					state.success = action.payload.message;
					state.balance = action.payload.data.balance;
					state.amount = 0;
					state.disabled = true;
				} else {
					state.error = action.payload.message || 'Terjadi kesalahan!';
				}
			})
			.addCase(userTopUpThunk.rejected, (state, action) => {
				state.loading = false;
				state.success = null;
				state.error = (action.payload as string) || 'Top up failed!';
			});
	},
});

export const { setAmount, resetTopUpState } = topUpSlice.actions;
export default topUpSlice.reducer;
