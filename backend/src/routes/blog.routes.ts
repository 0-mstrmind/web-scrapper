import {Router} from "express";
import { createBlog, deleteBlog, enhanceContent, getAllBlogs, getBlog, scrapBlogCreator, updateBlog } from "../controllers/blog.controller.js";

const blogRouter = Router();

// PHASE: 1
blogRouter.post("/create", createBlog);

blogRouter.put("/update/:id", updateBlog);

blogRouter.get("/", getAllBlogs);

blogRouter.get("/:id", getBlog);

blogRouter.delete("/:id", deleteBlog);

// scrap blog from internet and save in the database
blogRouter.post("/scrap", scrapBlogCreator);

// PHASE: 2
blogRouter.put("/enhance/:id", enhanceContent);

export default blogRouter;