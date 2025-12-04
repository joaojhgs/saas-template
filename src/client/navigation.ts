import { createNavigation } from 'next-intl/navigation';
import { Pathnames } from 'next-intl/routing';

import { languages } from '../locale';

const locales = Object.keys(languages);

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
// Is used to type all available routes as well as their languages
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  '/': '/',

  // If locales use different paths, you can
  // specify each external path per locale.
  //   '/about': {
  //     en: '/about',
  //     de: '/ueber-uns',
  //   },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  pathnames,
});
