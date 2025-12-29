import * as z from "zod";

export const blogValidationSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be less than 100 characters long"),
  categories: z
    .array(
      z
        .string()
        .min(3, "Category must be at least 3 characters long")
        .max(100, "Category must be less than 100 characters long")
    )
    .min(1, "At least one category is required"),
  content: z
    .string()
    .min(3, "Content must be at least 3 characters long")
    .max(10000, "Content must be less than 10000 characters long"),
  blogURL: z
    .string()
    .min(3, "URL must be at least 3 characters long")
    .max(100, "URL must be less than 100 characters long"),
  date: z.string(),
  author: z
    .string()
    .min(3, "Author must be at least 3 characters long")
    .max(100, "Author must be less than 100 characters long"),
});
