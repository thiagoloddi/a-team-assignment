import React from 'react';
import useScreenSize from '../../../hooks/useScreenSize';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';

const Menu: React.FC = () => {
    const screenSize = useScreenSize();

    return screenSize.isMobile ? <MenuMobile /> : <MenuDesktop />;
}

export default Menu;