import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const KEY = "global";

const globalSlice = createSlice({
	name: KEY,
	initialState: {
		isLoading: false,
		isLogin: false,
	},

	reducers: {
		// thay doi state
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setLogin: (state, action) => {
			state.isLogin = action.payload;
		},
	},
	// xu ly api roi thay doi state
	extraReducers: {},
});

const { reducer, actions } = globalSlice;
export const { setLoading, setLogin } = actions;
export default reducer;
