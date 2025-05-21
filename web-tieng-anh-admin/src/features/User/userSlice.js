import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "api";

const KEY = "user";

export const fetchUsers = createAsyncThunk(
	`${KEY}/fetchUsers`,
	async (params, thunkApi) => {
		const data = await userApi.fetchUsers(params);
		return data;
	}
);

const userSlice = createSlice({
	name: KEY,
	initialState: {
		isLoading: false,
		usersPage: {},
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: {
		[fetchUsers.pending]: (state, action) => {
			state.isLoading = true;
		},

		[fetchUsers.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.usersPage = action.payload;
		},

		[fetchUsers.rejected]: (state, action) => {
			state.isLoading = false;
		},
	},
});

const { reducer, actions } = userSlice;
export const { setLoading } = actions;
export default reducer;
