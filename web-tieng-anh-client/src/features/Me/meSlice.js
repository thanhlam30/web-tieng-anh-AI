import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const KEY = "me";

const meSlice = createSlice({
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

const { reducer, actions } = meSlice;
export const { setLoading } = actions;
export default reducer;
