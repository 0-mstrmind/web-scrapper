import mongoose, { model, Schema } from "mongoose";
import type { Model } from "mongoose";
import { BlogData } from "../..";

const oldBlogSchema = new Schema<BlogData>(
  {
    title: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: String,
        required: true,
        lowercase: true,
      },
    ],
    content: {
      type: String,
      required: true,
    },
    blogURL: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BlogModel: Model<BlogData> =
  mongoose.models.blogs || model<BlogData>("Blog", oldBlogSchema);
  
export default BlogModel;
