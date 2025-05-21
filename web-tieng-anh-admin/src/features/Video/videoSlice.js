import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { subtitleApi, videoApi, videoCategoryApi, videoWordApi } from "api";

const KEY = "video";

export const fetchVideoCategories = createAsyncThunk(
	`${KEY}/fetchVideoCategories`,
	async (params, thunkApi) => {
		const data = await videoCategoryApi.fetchVideoCategories();
		return data;
	}
);

export const deleteVideoCategory = createAsyncThunk(
	`${KEY}/deleteVideoCategory`,
	async (params, thunkApi) => {
		const { categoryId } = params;
		await videoCategoryApi.deleteVideoCategory(categoryId);
		return categoryId;
	}
);

export const fetchVideos = createAsyncThunk(
	`${KEY}/fetchVideos`,
	async (params, thunkApi) => {
		const data = await videoApi.fetchVideos(params);
		return data;
	}
);

export const fetchVideo = createAsyncThunk(
	`${KEY}/fetchVideo`,
	async (params, thunkApi) => {
		const data = await videoApi.fetchVideo(params);
		return data;
	}
);

export const deleteVideo = createAsyncThunk(
	`${KEY}/deleteVideo`,
	async (params, thunkApi) => {
		const { videoId } = params;
		await videoApi.deleteVideo(videoId);
		return videoId;
	}
);

export const deleteVideoWord = createAsyncThunk(
	`${KEY}/deleteVideoWord`,
	async (params, thunkApi) => {
		const { videoWordId } = params;
		await videoWordApi.deleteVideoWord(videoWordId);
		return videoWordId;
	}
);
export const deleteSubtitle = createAsyncThunk(
	`${KEY}/deleteSubtitle`,
	async (params, thunkApi) => {
		const { videoId } = params;
		await subtitleApi.deleteSubtitle(videoId);
		return videoId;
	}
);

const videoSlice = createSlice({
	name: KEY,
	initialState: {
		isLoading: false,
		videoCategories: [],
		videosPage: {},
		videoDetails: {},
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: {
		[fetchVideoCategories.pending]: (state, action) => {
			state.isLoading = true;
		},

		[fetchVideoCategories.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.videoCategories = action.payload;
		},
		[fetchVideos.pending]: (state, action) => {
			state.isLoading = true;
		},

		[fetchVideos.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.videosPage = action.payload;
		},
		[fetchVideo.pending]: (state, action) => {
			state.isLoading = true;
		},

		[fetchVideo.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.videoDetails = action.payload;
		},

		// delete VideoCategory
		[deleteVideoCategory.pending]: (state, action) => {
			state.isLoading = true;
		},

		[deleteVideoCategory.fulfilled]: (state, action) => {
			state.isLoading = false;
		},

		[deleteVideoCategory.rejected]: (state, action) => {
			state.isLoading = false;
		},
		// delete Video
		[deleteVideo.pending]: (state, action) => {
			state.isLoading = true;
		},

		[deleteVideo.fulfilled]: (state, action) => {
			state.isLoading = false;
		},

		[deleteVideo.rejected]: (state, action) => {
			state.isLoading = false;
		},
		// delete Video Word
		[deleteVideoWord.pending]: (state, action) => {
			state.isLoading = true;
		},

		[deleteVideoWord.fulfilled]: (state, action) => {
			state.isLoading = false;
		},

		[deleteVideoWord.rejected]: (state, action) => {
			state.isLoading = false;
		},
		// delete Subtitle
		[deleteSubtitle.pending]: (state, action) => {
			state.isLoading = true;
		},

		[deleteSubtitle.fulfilled]: (state, action) => {
			state.isLoading = false;
		},

		[deleteSubtitle.rejected]: (state, action) => {
			state.isLoading = false;
		},
	},
});

const { reducer, actions } = videoSlice;
export const {
	setLoading,
	setCategoryUpdate,
	updateCategoryVideo,
	addCategoryVideo,
	setCategoryFormVisible,
	setDefaultCategory,
} = actions;
export default reducer;
