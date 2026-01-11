import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type Mood } from "./types";

export const moodApi = createApi({
  reducerPath: "moodApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  tagTypes: ["Mood"],
  endpoints: (builder) => ({
    getMoods: builder.query<Mood[], void>({
      query: () => "/moods",
      providesTags: ["Mood"],
    }),

    createMood: builder.mutation<Mood, { name: string; songs: any[] }>({
      query: (body) => ({
        url: "/moods",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Mood"],
    }),

    updateMood: builder.mutation<Mood, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `/moods/${id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["Mood"],
    }),

    addSong: builder.mutation({
      query: ({ moodId, song }) => ({
        url: `/moods/${moodId}/songs`,
        method: "POST",
        body: song,
      }),
      invalidatesTags: (_result, _error, { moodId }) => [
        { type: "Mood", id: moodId },
      ],
    }),

    removeSong: builder.mutation<Mood, { moodId: string; songId: string }>({
      query: ({ moodId, songId }) => ({
        url: `/moods/${moodId}/songs/${songId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Mood"],
    }),

    recommendSongs: builder.query<any[], string>({
      query: (id) => `/moods/${id}/recommend`,
      providesTags: (_result, _error, id) => [{ type: "Mood", id }],
    }),

    deleteMood: builder.mutation<void, string>({
      query: (id) => ({
        url: `/moods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Mood"],
    }),

    updateSong: builder.mutation<
      void,
      {
        moodId: string;
        songId: string;
        title: string;
        artist: string;
      }
    >({
      query: ({ moodId, songId, title, artist }) => ({
        url: `/moods/${moodId}/songs/${songId}`,
        method: "PUT",
        body: { title, artist },
      }),
      invalidatesTags: (_result, _error, { moodId }) => [
        { type: "Mood", id: moodId },
      ],
    }),
  }),
});

export const {
  useGetMoodsQuery,
  useCreateMoodMutation,
  useUpdateMoodMutation,
  useAddSongMutation,
  useRemoveSongMutation,
  useRecommendSongsQuery,
  useDeleteMoodMutation,
  useUpdateSongMutation,
} = moodApi;
