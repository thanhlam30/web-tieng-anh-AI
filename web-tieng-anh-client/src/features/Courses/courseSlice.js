import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import courseApi from "api/courseApi";

const KEY = "course";

export const fetchCourses = createAsyncThunk(
	`${KEY}/fetchCourses`,
	async (params, thunkApi) => {
		const data = await courseApi.getCourses(params);
		return data;
	}
);

export const fetchCourseWords = createAsyncThunk(
	`${KEY}/fetchCourseWords`,
	async (params, thunkApi) => {
		const data = await courseApi.getCourseWords(params);
		return data;
	}
);

export const fetchCourseDetail = createAsyncThunk(
	`${KEY}/fetchCourseDetail`,
	async (params, thunkApi) => {
		const { slug } = params;
		const data = await courseApi.getCourseDetail(slug);
		return data;
	}
);
export const fetchTopics = createAsyncThunk(`${KEY}/fetchTopics`, async () => {
	const data = await courseApi.getTopics();
	return data;
});

const courseSlice = createSlice({
	name: KEY,
	initialState: {
		isLoading: false,
		topics: [],
		courses: {},
		courseWords: {},
		courseDetail: {},
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: {
		// Courses
		[fetchCourses.pending]: (state, action) => {
			state.isLoading = true;
		},
		[fetchCourses.fulfilled]: (state, action) => {
			state.courses = action.payload;
			state.isLoading = false;
		},
		[fetchCourses.rejected]: (state, action) => {
			state.isLoading = false;
		},

		// Course words
		[fetchCourseWords.pending]: (state, action) => {
			state.isLoading = true;
		},
		[fetchCourseWords.fulfilled]: (state, action) => {
			state.courseWords = action.payload;
			state.isLoading = false;
		},
		[fetchCourseWords.rejected]: (state, action) => {
			state.isLoading = false;
		},

		// Topics
		[fetchTopics.pending]: (state, action) => {
			state.isLoading = true;
		},
		[fetchTopics.fulfilled]: (state, action) => {
			state.topics = action.payload;
			state.isLoading = false;
		},
		[fetchTopics.rejected]: (state, action) => {
			state.isLoading = false;
		},

		// Course detail
		[fetchCourseDetail.pending]: (state, action) => {
			state.isLoading = true;
		},
		[fetchCourseDetail.fulfilled]: (state, action) => {
			state.courseDetail = action.payload;
			state.isLoading = false;
		},
		[fetchCourseDetail.rejected]: (state, action) => {
			state.courseDetail = action.payload;
			state.isLoading = false;
		},
	},
});

const { reducer, actions } = courseSlice;
export const { setLoading } = actions;
export default reducer;
