import { setBlogs } from "../../store/features/blog.slice";
import { clearSelectedBlog, setLoading, setSelectedBlog } from "../../store/features/blogDetails.slice";
import type { AppDispatch } from "../../store/store";
import type { IBlog } from "../../types";
import { apiConnector } from "../apiConnector";
import { blogEndpoints } from "./apis";

export const getAllBlogs =
  () =>
  async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      const response = await apiConnector("GET", blogEndpoints.getBlogs);
            
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

export const getSpecificBlog = 
  (id: string) =>
  async (dispatch: AppDispatch): Promise<boolean> => {
    try {
      const response = await apiConnector("GET", `${blogEndpoints.getSpecificBlog}/${id}`);
      
      dispatch(clearSelectedBlog());
      dispatch(setLoading(true));
      
      if (response.success) {
        dispatch(setSelectedBlog(response.data as IBlog));
        
        dispatch(setLoading(false));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error while fetching specific blog", error);
      return false;
    }
  };