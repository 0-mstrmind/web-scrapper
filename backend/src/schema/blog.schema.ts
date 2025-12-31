import mongoose, { model, Schema } from "mongoose";
import type { Model } from "mongoose";
import type { BlogData } from "../../index.js";

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
    updatedContent: {
      type: String,
    },
    references: [
      {
        type: String,
      },
    ],
    isUpdated: {
      type: Boolean,
      default: false,
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
