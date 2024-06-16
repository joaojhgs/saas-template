import camelCase from 'lodash/camelCase';
import { CamelCasedProperties } from 'type-fest';

export const getURL = (path: string = '') => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
          'http://localhost:3000/';

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, '');
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, '');

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

/* Bruh */
export const serializeToCamelCase = <T extends Record<string, unknown>>(
  obj: T,
): CamelCasedProperties<T> => {
  if (Array.isArray(obj)) {
    return obj.map((v) =>
      serializeToCamelCase(v),
    ) as unknown as CamelCasedProperties<T>;
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]:
          typeof obj[key] === 'object'
            ? serializeToCamelCase(obj[key] as T)
            : obj[key],
      }),
      {} as CamelCasedProperties<T>,
    );
  }
  return obj as CamelCasedProperties<T>;
};

export const serializeToSnakeCase = <T extends Record<string, unknown>>(
  obj: T,
): CamelCasedProperties<T> => {
  if (Array.isArray(obj)) {
    return obj.map((v) =>
      serializeToCamelCase(v),
    ) as unknown as CamelCasedProperties<T>;
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]:
          typeof obj[key] === 'object'
            ? serializeToCamelCase(obj[key] as T)
            : obj[key],
      }),
      {} as CamelCasedProperties<T>,
    );
  }
  return obj as CamelCasedProperties<T>;
};

export const removeLocale = (path: string) => {
  return '/' + path.split('/').slice(2).join('/');
};
