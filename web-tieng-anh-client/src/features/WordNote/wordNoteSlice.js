import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import wordNoteApi from "api/wordNoteApi";

const KEY = "wordNote";

export const fetchWordNotes = createAsyncThunk(
	`${KEY}/fetchWordNotes`,
	async () => {
		const data = await wordNoteApi.getWordNotes();
		return data;
	}
);

export const addNewWordNote = createAsyncThunk(
	`${KEY}/addNewWordNote`,
	async (params, thunkApi) => {
		const { values } = params;
		const data = await wordNoteApi.addNewWordNote(values);
		return data;
	}
);

export const updateWordNote = createAsyncThunk(
	`${KEY}/updateWordNote`,
	async (params, thunkApi) => {
		const { values } = params;
		const data = await wordNoteApi.updateWordNote(values);
		return data;
	}
);
export const deleteWordNote = createAsyncThunk(
	`${KEY}/deleteWordNote`,
	async (params, thunkApi) => {
		const { id } = params;
		const data = await wordNoteApi.deleteWordNote(id);
		return data;
	}
);
export const addToWordNote = createAsyncThunk(
	`${KEY}/addToWordNote`,
	async (params, thunkApi) => {
		const { value } = params;
		const data = await wordNoteApi.addToWordNote(value);
		return data;
	}
);

export const deleteFromWordNote = createAsyncThunk(
	`${KEY}/deleteFromWordNote`,
	async (params, thunkApi) => {
		const data = await wordNoteApi.deleteFromWordNote(params);
		return data;
	}
);

export const getWordNoteDetail = createAsyncThunk(
	`${KEY}/getWordNoteDetail`,
	async (params, thunkApi) => {
		const data = await wordNoteApi.getWordNoteDetail(params);
		return data;
	}
);
export const getWordNoteReview = createAsyncThunk(
	`${KEY}/getWordNoteReview`,
	async (params, thunkApi) => {
		const { wordnoteId, values } = params;
		const data = await wordNoteApi.getWordNoteReview(wordnoteId, values);
		return data;
	}
);

const wordNoteSlice = createSlice({
	name: KEY,
	initialState: {
		isLoading: false,
		isError: false,
		wordNotes: [],
		wordNoteDetail: {
			id: 0,
			name: "",
			createDate: "",
			wordNumber: 0,
			words: [],
		},
		word: {
			id: 0,
			name: "",
			image: "",
			definition: "",
			suggestions: [],
		},
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: {
		// fetchWordNotes
		[fetchWordNotes.pending]: (state, action) => {
			state.isError = false;
		},
		[fetchWordNotes.fulfilled]: (state, action) => {
			const wordNotes = action.payload;
			state.wordNotes = wordNotes;
		},
		[fetchWordNotes.rejected]: (state, action) => {
			state.isError = true;
		},

		// getWordNoteDetail
		[getWordNoteDetail.pending]: (state, action) => {
			state.isError = false;
		},
		[getWordNoteDetail.fulfilled]: (state, action) => {
			state.wordNoteDetail = action.payload;
		},
		[getWordNoteDetail.rejected]: (state, action) => {
			state.isError = true;
		},

		// getWordNoteReview
		[getWordNoteReview.pending]: (state, action) => {
			state.isError = false;
		},
		[getWordNoteReview.fulfilled]: (state, action) => {
			state.word = action.payload;
		},
		[getWordNoteReview.rejected]: (state, action) => {
			state.isError = true;
		},
	},
});

const { reducer, actions } = wordNoteSlice;
export const { setLoading } = actions;
export default reducer;
