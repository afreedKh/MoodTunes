import { configureStore } from "@reduxjs/toolkit";
import { moodApi } from "../features/moods/moodApi";

export const store = configureStore({
  reducer: {
    [moodApi.reducerPath]: moodApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moodApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
