import React from 'react';

import MediaRendering from '../../shared/media-rendering/MediaRendering';
import SiderDesktop from './SiderDesktop';
import SiderMenu from './SiderMenu';
import SiderMobile from './SiderMobile';

const SiderComponent: React.FC = () => {
  return (
    <>
      <MediaRendering isMobile>
        <SiderMobile>
          <SiderMenu />
        </SiderMobile>
      </MediaRendering>

      <MediaRendering isMobile={false}>
        <SiderDesktop>
          <SiderMenu />
        </SiderDesktop>
      </MediaRendering>
    </>
  );
};

export default SiderComponent;
