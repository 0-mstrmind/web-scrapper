const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/v1";

export const blogEndpoints = {
  getBlogs: BASE_URL + "/blogs/",
  getSpecificBlog: BASE_URL + "/blogs/:id",
}
