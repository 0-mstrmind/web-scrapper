import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector, type RootState } from "../store/store";
import { getSpecificBlog } from "../utils/api/blog";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, PenLine } from "lucide-react";

const BlogDetails = () => {
  const { blogId } = useParams();
  const dispatch = useAppDispatch();
  const selectedBlog = useAppSelector((state: RootState) => state.selectedBlog);
  const [showUpdated, setShowUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSpecificBlog(blogId!));
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen py-8 bg-transparent" data-theme="cupcake">
      {selectedBlog.loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        selectedBlog.data && (
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-8 pb-8 border-b">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold capitalize mb-4 leading-tight">
                {selectedBlog.data.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm opacity-70">
                {selectedBlog.data.author && (
                  <div className="flex items-center gap-2">
                    <PenLine size={16} />
                    <span className="capitalize">
                      {selectedBlog.data.author}
                    </span>
                  </div>
                )}

                {selectedBlog.data.date && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <time>{String(selectedBlog.data.date).split("T")[0]}</time>
                  </div>
                )}

                {selectedBlog.data.isUpdated && (
                  <div>
                    <span
                      className="badge badge-primary uppercase text-xs font-semibold"
                      data-theme="winter">
                      Enhanced
                    </span>
                  </div>
                )}
              </div>

              {selectedBlog.data.categories &&
                selectedBlog.data.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedBlog.data.categories.map((category, index) => (
                      <span
                        key={index}
                        className="badge badge-outline uppercase text-xs">
                        {category}
                      </span>
                    ))}
                  </div>
                )}

              <div className="mt-4 flex justify-end">
                {selectedBlog.data.isUpdated && (
                  <div
                    className="flex items-center gap-3 p-3 rounded-lg bg-base-200"
                    data-theme="light">
                    <span className="text-sm font-medium">
                      {showUpdated ? "Enhanced" : "Original"} Version
                    </span>
                    <input
                      type="checkbox"
                      checked={showUpdated}
                      className="toggle toggle-primary"
                      onChange={() => setShowUpdated(!showUpdated)}
                      title="This will show enhanced version by AI"
                    />
                  </div>
                )}
              </div>
            </header>

            <div className="markdown-content">
              <ReactMarkdown>
                {!showUpdated
                  ? selectedBlog.data.content
                  : selectedBlog.data.updatedContent}
              </ReactMarkdown>
            </div>

            <footer className="mt-12 pt-8 border-t">
              <div className="flex justify-between items-center">
                <Link to={"/"} className="btn btn-ghost btn-sm gap-2">
                  <ArrowLeft size={16} />
                  Back to Blogs
                </Link>
              </div>
            </footer>
          </article>
        )
      )}
    </div>
  );
};

export default BlogDetails;
