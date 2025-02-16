import { configureStore } from '@reduxjs/toolkit';
import showPasswordReducer from '../features/auth/showPasswordSlice';
import registerReducer from '../features/auth/registerSlice';
import loginReducer from '../features/auth/loginSlice';

import homeReducer from '../features/home/homeSlice';
import showBalanceReducer from '../features/home/showBalanceSlice';
import topUpReducer from '../features/top-up/topUpSlice';
import transactionHistoryReducer from '../features/transaction-history/transactionHistorySlice';
import logoutReducer from '../features/auth/logoutSlice';
import accountReducer from '../features/account/accountSlice';

export const store = configureStore({
	reducer: {
		registration: registerReducer,
		login: loginReducer,
		showPassword: showPasswordReducer,
		home: homeReducer,
		showBalance: showBalanceReducer,
		topUp: topUpReducer,
		transactionHistory: transactionHistoryReducer,
		logout: logoutReducer,
		updateProfile: accountReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
