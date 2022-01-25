import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@mui/material';

const useScreenSize = () => {
    const theme = useTheme();
    
    const [windowSize, setWindowSize] = useState(() => ({
        height: window.innerHeight,
        width: window.innerWidth,
        isMobile: window.innerWidth < theme.breakpoints.values.sm
    }))

    const handleWindowResize = useCallback(() => {
        setWindowSize({
            height: window.innerHeight,
            width: window.innerWidth,
            isMobile: window.innerWidth < 600
        });
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, [handleWindowResize]);

    return windowSize;
}

export default useScreenSize;