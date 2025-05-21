import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import videoApi from "api/videoApi";
const KEY = "video";

export const fetchCategoriesVideo = createAsyncThunk(
    "fetchCategoriesVideo",
    async (param, thunkApi) => {
        const data = await videoApi.fetchCategoriesVideo();
        return data;
    }
);

export const fetchByCategoryVideo = createAsyncThunk(
    "fetchByCategoryVideo",
    async (param, thunkApi) => {
        const { slug, level, timeFrom, timeTo } = param;
        const data = await videoApi.fetchByCategoryVideo(
            slug,
            level,
            timeFrom,
            timeTo
        );

        return data;
    }
);

export const fetchNextPage = createAsyncThunk(
    "fetchNextPage",
    async (param, thunkApi) => {
        const { slug, page, level, timeFrom, timeTo } = param;
        const data = await videoApi.fetchNextPage(
            slug,
            page,
            level,
            timeFrom,
            timeTo
        );
        return data;
    }
);

export const fetchSliderBySlug = createAsyncThunk(
    "fetchSliderBySlug",
    async (param, thunkApi) => {
        const { slug } = param;
        const data = await videoApi.fetchSliderBySlug(slug);
        return data;
    }
);

export const fetchVideo = createAsyncThunk(
    "fetchVideo",
    async (param, thunkApi) => {
        const { slug } = param;
        const data = await videoApi.fetchVideo(slug);
        return data;
    }
);
export const fetchMoreVideo = createAsyncThunk(
    "fetchMoreVideo",
    async (param, thunkApi) => {
        const { slug, size } = param;
        const data = await videoApi.fetchMoreVideo(slug, size);
        return data;
    }
);

const videoSlice = createSlice({
    name: KEY,
    initialState: {
        isLoading: false,
        categories: [],
        movies: {},
        moviesSlider: [],
        video: {},
        more: [],
        transcript: [],
        page: 0,
        totalPages: 0,
        audioPlay: "",
        subActive: '',
        sttInSub: '',
        isPlay: false


    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        raisePage: (state, action) => {
            if (state.page < state.totalPages) {
                state.page = state.page + 1;
            }
        },
        setAudioPlay: (state, action) => {
            state.audioPlay = action.payload;
        },
        setSubActive: (state, action) => {
            state.subActive = action.payload;
        },
        setSttInSub: (state, action) => {
            state.sttInSub = action.payload;

        },
        setIsPlay: (state, action) => {
            state.isPlay = action.payload;
        }

    },
    extraReducers: {
        [fetchCategoriesVideo.fulfilled]: (state, action) => {
            state.categories = action.payload;
        },

        [fetchByCategoryVideo.fulfilled]: (state, action) => {
            state.movies = action.payload;
            state.page = action.payload.page;
            state.totalPages = action.payload.totalPages;

        },
        [fetchNextPage.fulfilled]: (state, action) => {
            state.movies.data = state.movies.data.concat(action.payload.data);
        },
        [fetchSliderBySlug.fulfilled]: (state, action) => {
            const tempMovie = action.payload.data.slice(0, 5);
            state.moviesSlider = tempMovie;
        },

        [fetchVideo.fulfilled]: (state, action) => {
            state.video = action.payload;
            state.transcript = action.payload.subtitles;
            state.showMore = false;
        },
        [fetchMoreVideo.fulfilled]: (state, action) => {
            state.more = action.payload.data;
        },
    },
});

const { reducer, actions } = videoSlice;
export const {
    setLoading,
    setShowMore,
    setAudioPlay,
    raisePage,
    changeSubject,
    setSubActive,
    setSttInSub,
    setIsPlay
} = actions;
export default reducer;
