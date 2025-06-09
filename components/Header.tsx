"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHeaderBorder } from "@/hooks/useHeaderBorder";
import { createContext, useContext, useState } from "react";

// Create context for the show titles state
export const ShowTitlesContext = createContext<{
  showTitles: boolean;
  setShowTitles: (show: boolean) => void;
}>({
  showTitles: false,
  setShowTitles: () => {},
});

export const useShowTitles = () => useContext(ShowTitlesContext);

const Header = () => {
  const { borderClass } = useHeaderBorder();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [showTitles, setShowTitles] = useState(false);

  // Extract page number from pathname (e.g., "/01" -> "01")
  const pageNumber = pathname.slice(1);
  const hasValidPageNumber = /^\d+$/.test(pageNumber);

  const handleToggleTitles = () => {
    setShowTitles((prev) => !prev);
  };

  return (
    <ShowTitlesContext.Provider value={{ showTitles, setShowTitles }}>
      <header
        className={`sticky top-0 z-50 bg-white dark:bg-neutral-950 ${borderClass}`}
      >
        <nav className="flex py-2.5 sm:px-2.5 px-4.5 items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center font-lora font-medium"
            aria-label="Go to homepage"
            tabIndex={0}
          >
            <h1 className="group-hover:text-neutral-500">astnai</h1>
            <span
              className="text-neutral-500"
              aria-label={`Current page: ${isHome ? "lab" : pathname.slice(1)}`}
            >
              {isHome ? "/lab" : pathname}
            </span>
          </Link>

          {/* Source Code Link */}
          {hasValidPageNumber && (
            <a
              href={`https://github.com/astnai/lab/blob/master/app/${pageNumber}/page.tsx`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 font-mono tracking-tighter"
              aria-label="View source code"
            >
              [source]
            </a>
          )}

          {isHome && (
            <button
              className="text-neutral-500 font-mono tracking-tighter cursor-pointer text-sm sm:text-base"
              aria-label="Toggle titles visibility"
              tabIndex={0}
              onClick={handleToggleTitles}
            >
              [{showTitles ? "on" : "off"}]
            </button>
          )}
        </nav>
      </header>
    </ShowTitlesContext.Provider>
  );
};

export default Header;
