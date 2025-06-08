"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useHeaderBorder = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    borderClass: !isHome || hasScrolled 
      ? "border-b border-neutral-200 dark:border-neutral-800 transition-all duration-200 ease-in-out" 
      : "border-b border-transparent dark:border-transparent transition-all duration-200 ease-in-out",
  };
}; 