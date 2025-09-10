import React from "react";
import { HashLink } from "react-router-hash-link";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-zinc-200 dark:border-zinc-800 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          <HashLink smooth to="/" className="hover:text-foreground transition-colors">
            Home
          </HashLink>
          <HashLink smooth to="/#about" className="hover:text-foreground transition-colors">
            About
          </HashLink>
          <HashLink smooth to="/board" className="hover:text-foreground transition-colors">
            Board
          </HashLink>
        </div>

        {/* External Links */}
        <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
          <a
            href="https://github.com/ankitchawla3123"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://in.linkedin.com/in/ankit-chawla3123"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
        &copy; {new Date().getFullYear()} The Ultimate Tactics. All rights reserved.
      </div>
    </footer>
  );
}
