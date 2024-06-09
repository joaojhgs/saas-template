'use client';

import { useMemo } from 'react';

import { useIsClientMobile, useMediaQuery } from '@/client/hooks/useMediaQuery';
import { IMediaRendering } from '@/schemas';

interface IMediaRenderingClient extends IMediaRendering {
  serverWidth?: number;
  serverMobile?: boolean;
}

/**
 * Renders the children based on the given constraints.
 *
 * @param {number} minWidth - The minimum width constraint.
 * @param {number} maxWidth - The maximum width constraint.
 * @param {boolean} isMobile - Whether to render when the device is mobile or not, overrides all width constraints.
 * @param {React.ReactNode} children - The children to render.
 * @param {number} serverWidth - The width captured from the server.
 * @param {boolean} serverMobile - Whether it's mobile captured from the server.
 * @return {React.ReactNode} The rendered children.
 *
 *   This component is used to render content based on the device size.
 *   It's used and rendered only in the client side of the application after hidration
 *   Merging the state passed from the server side
 */
const MediaRenderingClient = ({
  minWidth,
  maxWidth,
  children,
  serverWidth,
  isMobile,
}: IMediaRenderingClient) => {
  // Matches for min and max width constraints as well as mobile in the client side
  const isDeviceMobile = useIsClientMobile();
  const isDeviceMinSize = useMediaQuery(`(min-width: ${minWidth}px)`);
  const isDeviceMaxSize = useMediaQuery(`(max-width: ${maxWidth}px)`);

  // Matches for min and max width constraints as well as mobile in the server side
  const isServerMobile = serverWidth && serverWidth <= 768;
  const isServerMinSize = serverWidth && minWidth && serverWidth >= minWidth;
  const isServerMaxSize = serverWidth && maxWidth && serverWidth <= maxWidth;

  // Merge both states giving priority to the client side
  const meetsMobile = useMemo(
    () => isDeviceMobile || isServerMobile,
    [isDeviceMobile, isServerMobile],
  );
  const meetsMinSize = useMemo(
    () => isDeviceMinSize || isServerMinSize,
    [isDeviceMinSize, isServerMinSize],
  );
  const meetsMaxSize = useMemo(
    () => isDeviceMaxSize || isServerMaxSize,
    [isDeviceMaxSize, isServerMaxSize],
  );

  // If the "isMobile" prop is passed it ignore width constraints
  if (isMobile === true && meetsMobile) return <>{children}</>;
  if (isMobile === false && !isDeviceMobile) return <>{children}</>;

  return <>{(meetsMaxSize || meetsMinSize) && children}</>;
};

export default MediaRenderingClient;
