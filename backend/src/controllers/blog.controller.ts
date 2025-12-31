import asyncHandler from "../utils/AsyncHandler";
import type { Request, Response } from "express";
import { blogValidationSchema } from "../validators/blog.validator";
import { ApiError } from "../utils/ApiError";
import BlogModel from "../schema/blog.schema";
import { ApiResponse } from "../utils/ApiResponse";
import { getAllBlogData } from "../utils/webScrapper";
import { getReferenceArticleData } from "../utils/googleSearch";
import { enhanceArticle } from "../utils/llm";

// PHASE: 1
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
  const blogs = await BlogModel.find().select(
    "-updatedContent -references -isUpdated"
  );

  if (!blogs) {
    throw new ApiError(400, "Blogs not found");
  }

  const trimmedBlog = blogs.map((blog) => {
    return {
      _id: blog._id,
      title: blog.title,
      content: blog.content?.slice(0, 100).replace(/#/g, "").trim() || "",
      blogURL: blog.blogURL,
      author: blog.author,
      date: blog.date,
      categories: blog.categories,
    };
  });

  return new ApiResponse({
    statusCode: 200,
    message: "Blogs fetched successfully",
    data: trimmedBlog,
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

export const scrapBlogCreator = asyncHandler(
  async (req: Request, res: Response) => {
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
      data: createdBlogs,
    }).send(res);
  }
);

// PHASE: 2

// Enhance blog content
export const enhanceContent = asyncHandler(
  async (req: Request, res: Response) => {
    const blogId = req.params.id;

    if (!blogId) {
      throw new ApiError(400, "Blog ID is required");
    }

    const blog = await BlogModel.findById({
      _id: blogId,
    });

    if (!blog) {
      throw new ApiError(404, "Blog not found!");
    }

    const referenceArticleData = await getReferenceArticleData(blog.title);

    if (!referenceArticleData) {
      throw new ApiError(500, "Failed to fetch reference article data");
    }

    const rawContent = [
      {
        title: blog.title,
        content: blog.content,
        url: blog.blogURL,
      },
      ...referenceArticleData,
    ];

    // type safety
    const articleContent = rawContent.map((item) => ({
      title: item.title ?? "",
      content: item.content ?? "",
      url: item.url ?? "",
    }));

    const newContent = await enhanceArticle(articleContent);

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      {
        _id: blogId,
      },
      {
        updatedContent: newContent,
        isUpdated: true,
        references: rawContent.slice(1).map((elem) => elem.url),
      },
      {
        new: true,
      }
    );

    if (!updatedBlog) {
      throw new ApiError(500, "Failed to update blog");
    }

    return new ApiResponse({
      statusCode: 200,
      message: "Blog enhanced successfully!",
      data: updatedBlog,
    }).send(res);
  }
);
