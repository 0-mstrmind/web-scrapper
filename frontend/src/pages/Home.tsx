import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, type RootState } from "../store/store";
import { getAllBlogs } from "../utils/api/blog";
import type { IBlog } from "../types";
import BlogCard from "./BlogCard";

const Home = () => {
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state: RootState) => state.blog);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await dispatch(getAllBlogs());

      if (res) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 p-4 md:p-0">
      {loading
        ? "Loading..."
        : blogs
        ? blogs.map((blog: IBlog) => {
            return (
              <BlogCard
                key={blog._id}
                title={blog.title}
                content={blog.content}
                categories={blog.categories}
                date={blog.date}
                author={blog.author}
              />
            );
          })
        : "No data found"}
    </div>
  );
};

export default Home;
