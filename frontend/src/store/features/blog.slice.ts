import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IBlog } from "../../types";

const initialState: IBlog[] = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action: PayloadAction<IBlog[]>) => {
      state.push(...action.payload);
    },
    clearBlogs: () => {
      return [];
    },
  },
})

export const { setBlogs, clearBlogs } = blogSlice.actions;
export default blogSlice.reducer;