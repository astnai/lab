import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names and merges Tailwind CSS classes efficiently.
 * This utility function uses clsx for conditional class names and tailwind-merge
 * to handle class conflicts and deduplication.
 * 
 * @param inputs - Class names to be combined
 * @returns A string of merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 