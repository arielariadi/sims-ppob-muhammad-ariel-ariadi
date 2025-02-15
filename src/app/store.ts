import { configureStore } from '@reduxjs/toolkit';
import showPasswordReducer from '../features/auth/showPasswordSlice';
import registerReducer from '../features/auth/registerSlice';
import loginReducer from '../features/auth/loginSlice';

export const store = configureStore({
	reducer: {
		registration: registerReducer,
		login: loginReducer,
		showPassword: showPasswordReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
