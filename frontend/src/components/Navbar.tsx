import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector, type RootState } from "../store/store";
import { setBlogs } from "../store/features/blog.slice";

const Navbar = () => {
  const input = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const blogs = useAppSelector((state: RootState) => state.blog);

  const handleSearch = () => {
    if (!input.current) return;

    const searchTerm = input.current.value.toLowerCase().trim();

    if (searchTerm === "") {
      dispatch(setBlogs(refBlog.current)); 
      return;
    }

    const filtered = blogs
      .map((blog) => {
        let score = 0;
        const title = blog.title.toLowerCase();
        const content = blog.content?.toLowerCase() || "";
        const author = blog.author?.toLowerCase() || "";
        const categories =
          blog.categories?.map((c) => c.toLowerCase()).join(" ") || "";

        if (title.includes(searchTerm)) score += 10;
        if (title.startsWith(searchTerm)) score += 5;

        if (categories.includes(searchTerm)) score += 7;

        if (author.includes(searchTerm)) score += 5;

        if (content.includes(searchTerm)) score += 3;

        return { ...blog, searchScore: score };
      })
      .filter((blog) => blog.searchScore > 0)
      .sort((a, b) => b.searchScore - a.searchScore);

    dispatch(setBlogs(filtered));
  };

  const refBlog = useRef(blogs);

  useEffect(() => {
    if (blogs.length > 0 && refBlog.current.length === 0) {
      refBlog.current = blogs;
    }
  }, [blogs]);

  return (
    <div className="navbar bg-base-100 p-4">
      <div className="flex-1">
        <Link to="/" className="font-semibold text-lg uppercase">
          Write Up
        </Link>
      </div>
      <div className="flex gap-2">
        <input
          ref={input}
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          onInput={() => handleSearch()}
        />
        <div className="w-10 rounded-full flex justify-center items-center">
          <a href="https://github.com/0-mstrmind/web-scrapper.git">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github-icon lucide-github text-gray-500">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
