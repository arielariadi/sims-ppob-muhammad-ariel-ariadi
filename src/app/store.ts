import { configureStore } from '@reduxjs/toolkit';
import showPasswordReducer from '../features/auth/showPasswordSlice';
import registerReducer from '../features/auth/registerSlice';
import loginReducer from '../features/auth/loginSlice';
import homeReducer from '../features/home/homeSlice';
import showBalanceReducer from '../features/home/showBalanceSlice';

export const store = configureStore({
	reducer: {
		registration: registerReducer,
		login: loginReducer,
		showPassword: showPasswordReducer,
		home: homeReducer,
		showBalance: showBalanceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
