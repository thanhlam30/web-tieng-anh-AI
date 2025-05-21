import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const KEY = "home";

const homeSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {},
});

const { reducer, actions } = homeSlice;
export const { setLoading } = actions;
export default reducer;
