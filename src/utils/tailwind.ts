import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * This function merges classnames using `clsx` and use Tailwind-merge to override conflicting classes.
 * @param inputs - The classnames to merge.
 * @returns The generated classnames.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
