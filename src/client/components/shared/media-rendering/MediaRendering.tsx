'use server';

import { headers } from 'next/headers';

import { IMediaRendering } from '@/schemas';

import MediaRenderingClient from './MediaRenderingClient';

/**
 * Renders the children based on the given constraints.
 *
 * @param {number} minWidth - The minimum width constraint.
 * @param {number} maxWidth - The maximum width constraint.
 * @param {boolean} isMobile - Whether to render when the device is mobile or not, overrides all width constraints.
 * @param {React.ReactNode} children - The children to render.
 * @return {React.ReactNode} The rendered children.
 *
 *   This is a server component used to grab as much browser info as possible from the request.
 *   passing it to the client side and then updating it with reliable data
 */
const MediaRendering = ({ children, ...props }: IMediaRendering) => {
  const allHeaders = headers();

  // Try to use multiple headers the browser MIGHT send to capture screen width
  const serverWidth =
    allHeaders.get('sec-ch-viewport-width') ||
    allHeaders.get('sec-ch-width') ||
    allHeaders.get('viewport-width') ||
    allHeaders.get('width') ||
    undefined;

  // Capture if browser sent hint about requesting a mobile version of the page
  const serverMobile = allHeaders.get('sec-ch-ua-mobile') === '?1';

  return (
    <MediaRenderingClient
      {...props}
      serverWidth={serverWidth ? parseInt(serverWidth) : undefined}
      serverMobile={serverMobile}
    >
      {children}
    </MediaRenderingClient>
  );
};

export default MediaRendering;
