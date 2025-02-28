import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.aceessToken;
      localStorage.setItem("token", action.payload.accessToken);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear()
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
