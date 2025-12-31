import { setBlogs } from "../../store/features/blog.slice";
import type { AppDispatch } from "../../store/store";
import type { IBlog } from "../../types";
import { apiConnector } from "../apiConnector";
import { blogEndpoints } from "./apis";

export const getAllBlogs =
  () =>
  async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      const response = await apiConnector("GET", blogEndpoints.getBlogs);
      
      console.log(response);
      
      if (response.success) {
        dispatch(setBlogs(response.data as IBlog[]));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error while fetching all blogs", error);
      return false;
    }
};
