import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { contactApi } from "../features/contact/contactApi";
import authReducer from "../features/auth/authSlice";
import contactReducer from "../features/contact/contactSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    [authApi.reducerPath]: authApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApi.middleware, authApi.middleware),
});
