import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to intelligently merge Tailwind CSS classes.
 * It combines the power of clsx (for conditional classes) and 
 * tailwind-merge (to resolve conflicting Tailwind utility classes).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}