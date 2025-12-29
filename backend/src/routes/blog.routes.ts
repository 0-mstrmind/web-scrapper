import {Router} from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlog, scrapBlogCreator, updateBlog } from "../controllers/blog.controller";

const blogRouter = Router();

blogRouter.post("/create", createBlog);

blogRouter.put("/update/:id", updateBlog);

blogRouter.get("/", getAllBlogs);

blogRouter.get("/:id", getBlog);

blogRouter.delete("/:id", deleteBlog);

// scrap blog from internet and save in the database
blogRouter.post("/scrap", scrapBlogCreator);

export default blogRouter;