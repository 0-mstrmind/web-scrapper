import asyncHandler from "../utils/AsyncHandler";
import type { Request, Response } from "express";
import { blogValidationSchema } from "../validators/blog.validator";
import { ApiError } from "../utils/ApiError";
import BlogModel from "../schema/blog.schema";
import { ApiResponse } from "../utils/ApiResponse";
import { getAllBlogData } from "../utils/webScrapper";

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const validation = blogValidationSchema.safeParse(req.body);

  if (!validation.success) {
    const errMessage = validation.error.issues[0].message;
    throw new ApiError(400, errMessage);
  }

  const blog = await BlogModel.create(req.body);

  if (!blog) {
    throw new ApiError(400, "Blog not created");
  }

  return new ApiResponse({
    statusCode: 201,
    message: "Blog created successfully",
    data: blog,
  }).send(res);
});

export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const blogId = req.params.id;

  const validation = blogValidationSchema.safeParse(req.body);

  if (!validation.success) {
    const errMessage = validation.error.issues[0].message;
    throw new ApiError(400, errMessage);
  }

  if (!blogId) {
    throw new ApiError(400, "Blog id is required");
  }

  const blog = await BlogModel.findByIdAndUpdate(blogId, req.body, {
    new: true,
  });

  if (!blog) {
    throw new ApiError(400, "Blog not found");
  }

  return new ApiResponse({
    statusCode: 200,
    message: "Blog updated successfully",
    data: blog,
  }).send(res);
});

export const getBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await BlogModel.findById(req.params.id);

  if (!blog) {
    throw new ApiError(400, "Blog not found");
  }

  return new ApiResponse({
    statusCode: 200,
    data: blog,
  }).send(res);
});

export const getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
  const blogs = await BlogModel.find();

  if (!blogs) {
    throw new ApiError(400, "Blogs not found");
  }

  return new ApiResponse({
    statusCode: 200,
    message: "Blogs fetched successfully",
    data: blogs,
  }).send(res);
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const blogId = req.params.id;

  const deletedBlog = await BlogModel.findByIdAndDelete(blogId);

  if (!deletedBlog) {
    throw new ApiError(400, "Blog not found");
  }

  return new ApiResponse({
    statusCode: 200,
    message: "Blog deleted successfully",
  }).send(res);
});

export const scrapBlogCreator = asyncHandler(async (req: Request, res: Response) => {
  const data = await getAllBlogData(); // fetching scrapped blog data
  
  if (data == null) {
    throw new ApiError(500, "Failed to fetch blog data");
  }
  
  const createdBlogs = await Promise.all(
    data.map(async (elem) => {
      const blog = await BlogModel.create(elem);
      return blog;
    })
  );
  
  if (!createdBlogs) {
    throw new ApiError(500, "Failed to create blog");
  }
  
  return new ApiResponse({
    statusCode: 200,
    message: "Blogs created successfully",
    data: createdBlogs
  }).send(res);
});