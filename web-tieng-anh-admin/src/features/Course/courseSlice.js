import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseApi, topicApi, wordApi } from "api";
import { courseValues, topicValues } from "./initialAndValidateValues";

const KEY = "course";

export const fetchCourses = createAsyncThunk(
	`${KEY}/fetchCourses`,
	async (params, thunkApi) => {
		const data = await courseApi.fetchCourses(params);
		return data;
	}
);

export const fetchCourse = createAsyncThunk(
	`${KEY}/fetchCourse`,
	async (params, thunkApi) => {
		const data = await courseApi.fetchCourse(params);
		return data;
	}
);

export const fetchTopics = createAsyncThunk(
	`${KEY}/fetchTopics`,
	async (params, thunkApi) => {
		const data = await topicApi.fetchTopics();

		return data;
	}
);

export const deleteCourse = createAsyncThunk(
	`${KEY}/deleteCourse`,
	async (params, thunkApi) => {
		const { courseId } = params;
		await courseApi.deleteCourse(courseId);
		return courseId;
	}
);

export const deleteTopic = createAsyncThunk(
	`${KEY}/deleteTopic`,
	async (params, thunkApi) => {
		const { topicId } = params;
		await topicApi.deleteTopic(topicId);
		return topicId;
	}
);

export const fetchWordsByCourse = createAsyncThunk(
	`${KEY}/fetchWordsByCourse`,
	async (params, thunkApi) => {
		const data = await wordApi.fetchWordsByCourse(params);
		return data;
	}
);

export const deleteWord = createAsyncThunk(
	`${KEY}/deleteWord`,
	async (params, thunkApi) => {
		const { wordId } = params;
		await wordApi.deleteWord(wordId);
		return wordId;
	}
);

const courseSlice = createSlice({
	name: KEY,
	initialState: {
		isLoading: false,
		coursesPage: {},
		coursesDetail: {},
		topics: [],
		wordsPage: {},
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setSelectedBlogDefault: (state, action) => {
			state.selectedCourse = courseValues.initial;
		},
		setSelectedTopicDefault: (state, action) => {
			state.selectedTopic = topicValues.initial;
		},
	},
	extraReducers: {
		[fetchCourses.pending]: (state, action) => {
			state.isLoading = true;
		},

		[fetchCourses.fulfilled]: (state, action) => {
			state.isLoading = false;

			state.coursesPage = action.payload;
		},

		[fetchTopics.pending]: (state, action) => {
			state.isLoading = true;
		},
		[fetchTopics.fulfilled]: (state, action) => {
			state.topics = action.payload;
			state.isLoading = false;
		},

		[fetchWordsByCourse.pending]: (state, action) => {
			state.isLoading = true;
		},
		[fetchWordsByCourse.fulfilled]: (state, action) => {
			state.wordsPage = action.payload;
			state.isLoading = false;
		},

		[fetchCourse.pending]: (state, action) => {
			state.isLoading = true;
		},

		[fetchCourse.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.coursesDetail = action.payload;
		},
		[deleteCourse.pending]: (state, action) => {
			state.isLoading = true;
		},
		[deleteCourse.fulfilled]: (state, action) => {
			state.isLoading = false;
		},
		[deleteCourse.rejected]: (state, action) => {
			state.isLoading = false;
		},

		[deleteTopic.fulfilled]: (state, action) => {
			state.isLoading = false;
		},

		[deleteTopic.pending]: (state, action) => {
			state.isLoading = true;
		},

		[deleteTopic.rejected]: (state, action) => {
			state.isLoading = false;
		},

		[deleteWord.fulfilled]: (state, action) => {
			state.isLoading = false;
		},
	},
});

const { reducer, actions } = courseSlice;
export const { setLoading } = actions;
export default reducer;
