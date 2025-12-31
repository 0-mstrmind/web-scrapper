import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IBlog } from "../../types";

interface ISelectedBlog {
  data: IBlog | null;
  loading: boolean;
}

const initialState: ISelectedBlog = {
  data: null,
  loading: true,
};

const selectedBlogSlice = createSlice({
  name: "selectedBlog",
  initialState,
  reducers: {
    setSelectedBlog: (state, action: PayloadAction<IBlog>) => {
      state.data = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearSelectedBlog: (state) => {
      state.loading = false;
      state.data = null;
    },
  }
});

export const { setSelectedBlog, setLoading, clearSelectedBlog } = selectedBlogSlice.actions;
export default selectedBlogSlice.reducer;