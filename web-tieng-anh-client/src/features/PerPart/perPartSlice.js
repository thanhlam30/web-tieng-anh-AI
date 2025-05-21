import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookApi from "api/bookApi";
import examApi from "api/examApi";

const KEY = "perPart";

export const fetchBooks = createAsyncThunk(
  `${KEY}/fetchBooks`,
  async (params, thunkApi) => {
    const data = await bookApi.fetchBooks();

    return data;
  }
);

export const fetchQuestionsOfPart = createAsyncThunk(
  `${KEY}/fetchQuestionsOfPart`,
  async (params, thunkApi) => {
    const { numberPart, examSlug } = params;
    const questionsResult = await examApi.fetchQuestionsOfPart(
      numberPart,
      examSlug
    );

    return questionsResult;
  }
);

const perPartSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    books: [],
    questions: [],
    selectedIndex: 0,
    isChoiceOfPart1_2_5: false,
    isChoiceOfPart3_4_6_7: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSelectedIndexNext: (state, action) => {
      state.selectedIndex += 1;
    },
    restoreQuestionsDefault: (state, action) => {
      state.questions = [];
      state.selectedIndex = 0;
    },
    setChoiceOfPart1_2_5: (state, action) => {
      state.isChoiceOfPart1_2_5 = action.payload;
    },
    setChoiceOfPart3_4_6_7: (state, action) => {
      state.isChoiceOfPart3_4_6_7 = action.payload;
    },
  },
  extraReducers: {
    [fetchBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [fetchBooks.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchBooks.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [fetchQuestionsOfPart.fulfilled]: (state, action) => {
      state.questions = action.payload;
      state.selectedIndex = 0;
    },
  },
});

const { reducer, actions } = perPartSlice;
export const {
  setLoading,
  setSelectedIndexNext,
  restoreQuestionsDefault,
  setChoiceOfPart1_2_5,
  setChoiceOfPart3_4_6_7,
} = actions;
export default reducer;
