import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "./ApiSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use for localStorage
import userReducer from './UserSlice'

const persistConfig = {
  key: "userInfo",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(ApiSlice.middleware),
});

export const persistor = persistStore(store);
export default store;
