import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-10">
      <div className="footer max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-base-content flex">
        <aside className="flex flex-col gap-4 flex-1">
          <Link
            to="/"
            className="font-bold text-2xl uppercase tracking-tight hover:opacity-80 transition-opacity">
            Write Up
          </Link>

          <p className="text-sm opacity-70 max-w-xs">
            Your platform for sharing and discovering quality written content.
          </p>

          <p className="text-xs opacity-60">
            Copyright © {new Date().getFullYear()} Write Up. All rights
            reserved.
          </p>
        </aside>

        <nav className="flex flex-col gap-2 justify-end">
          <h6 className="footer-title opacity-80 text-sm">Connect</h6>
          <div className="flex gap-3">
            <a
              href="https://github.com/0-mstrmind"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm btn-circle hover:bg-base-300"
              aria-label="GitHub">
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
            <a
              href="https://x.com/0_mstrmind"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm btn-circle hover:bg-base-300"
              aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>

      <div className="footer footer-center border-t border-base-300 px-4 py-4 text-xs opacity-60">
        <p className="flex">Made with ❤️ by <a href="https://www.mstrmind.in">mstrmind</a></p>
      </div>
    </footer>
  );
};

export default Footer;
