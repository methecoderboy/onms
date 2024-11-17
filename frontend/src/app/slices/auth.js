import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../lib/Axios";

const initialState = {
  user: null,
  isLoggedIn: false,
  role: null,
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logout } = slice.actions;

export default slice.reducer;

export const Login = createAsyncThunk(
  "/auth/login",
  async (formData, { dispatch }) => {
    try {
      const { data } = await Axios.post("/auth/login", formData, {
        withCredentials: true,
      });
      if (data.success) {
        dispatch(setUser(data.user));
      }
    } catch (error) {
      console.error(error);
    }
  }
);
