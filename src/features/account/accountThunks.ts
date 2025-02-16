/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userUploadProfileImageAPI, userUpdateUserProfileAPI } from '../../API';

export const userUploadProfileImageThunk = createAsyncThunk(
	'account/uploadProfileImage',
	async (formData: FormData, { rejectWithValue }) => {
		try {
			const response = await userUploadProfileImageAPI(formData);
			return response;
		} catch (error: any) {
			if (error.response && error.response?.data?.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const userUpdateUserProfileThunk = createAsyncThunk(
	'account/updateProfile',
	async (
		profileData: { first_name: string; last_name: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await userUpdateUserProfileAPI(profileData);
			return response;
		} catch (error: any) {
			if (error.response && error.response?.data?.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
