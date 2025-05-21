import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import meApi from "api/meApi";

const KEY = "global";

export const fetchNameRoles = createAsyncThunk(
  `${KEY}/fetchNameRoles`,
  async (params, thunkApi) => {
    const nameRolesResult = await meApi.fetchNameRoles();

    return nameRolesResult;
  }
);

const globalSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    isLogin: false,
    name: "",
    roles: [],
  },

  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setDefaultLogin: (state, action) => {
      state.isLogin = false;
      state.name = "";
      state.roles = [];
    },
  },

  extraReducers: {
    [fetchNameRoles.fulfilled]: (state, action) => {
      const { name, roles } = action.payload;

      const index = roles.findIndex((roleEle) => roleEle === "ROLE_USER");

      if (index !== -1) {
        state.isLogin = false;
        return;
      }

      state.isLogin = true;
      state.name = name;
      state.roles = roles;
    },
    [fetchNameRoles.rejected]: (state, action) => {
      state.isLogin = false;
      localStorage.removeItem("token");
    },
  },
});

const { reducer, actions } = globalSlice;
export const { setLoading, setLogin, setDefaultLogin } = actions;
export default reducer;
