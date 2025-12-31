import { CalendarFold, User } from "lucide-react";
import type { BlogCard } from "../types";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ title, content, categories, author, date }: BlogCard) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${title}`);
  };

  return (
    <div
      className="card bg-base-100 w-full shadow-sm cursor-pointer"
      onClick={handleClick}
      title="Click to view blog"
      data-theme="acid">
      <div className="card-body">
        <h2 className="card-title capitalize">{title}</h2>
        <p className="line-clamp-3">{content}...</p>

        <div className="flex flex-wrap gap-2 mt-2 select-none">
          {categories.map((category, index) => (
            <span key={index} className="badge badge-outline uppercase text-xs">
              {category}
            </span>
          ))}
        </div>

        <div className="divider my-2"></div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <User size={16} className="opacity-60" />
            <span className="capitalize text-sm">{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarFold size={16} className="opacity-60" />
            <span className="text-sm opacity-60">
              {String(date).split("T")[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
