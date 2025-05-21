import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import translateApi from "api/translateApi";

const KEY = "translate";

export const fetchTranslates = createAsyncThunk(
	`${KEY}/fetchTranslates`,
	async (params, thunkApi) => {
		const { wordToTranslate } = params;
		const data = await translateApi.getTranslate(wordToTranslate);
		return data;
	}
);

const translateSlice = createSlice({
	name: KEY,
	initialState: {
		isLoading: false,
		translateResult: {},
		isNotFound: false,
	},

	reducers: {
		// thay doi state
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setIsNotFound: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	// xu ly api roi thay doi state
	extraReducers: {
		// khi đang xử lý
		[fetchTranslates.pending]: (state, action) => {
			state.isLoading = true;
			state.isNotFound = false;
		},
		// khi thành công
		[fetchTranslates.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.translateResult = action.payload;
		},
		// khi thất bại
		[fetchTranslates.rejected]: (state, action) => {
			state.isLoading = false;
			state.isNotFound = true;
		},
	},
});

const { reducer, actions } = translateSlice;
export const { setLoading, setIsNotFound } = actions;
export default reducer;
