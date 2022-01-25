import React, { useMemo } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import useScreenSize from '../hooks/useScreenSize';

export type TAppTheme = {
    isMobile: boolean;
    contentWidth: string;
    contentMargin: number;
    menuWidth: number;
    colors: {
        purple1: string;
        grey1: string;
        orange1: string;
    }
};

const GlobalStyle = createGlobalStyle`
    html, body {
        padding: 0;
        margin: 0;
        font-family: Inter, arial, sans-serif;
        font-weight: 300;
    }

    textarea, input { 
        outline: none; 
        -webkit-appearance: none;
        border: none;
    }

    h1 {
        font-size: 40px;
        font-weight: 700;
        font-color: #37352F;
        margin: 0;
    }
`;

const StyledComponentsThemeProvider: React.FC = ({ children }) => {
    const { isMobile } = useScreenSize();
    
    const menuWidth = 120;

    const theme = useMemo<TAppTheme>(() => {
        return {
            isMobile,
            contentWidth: isMobile ? '100%' : `calc(100% - ${menuWidth}px)`,
            contentMargin: isMobile ? 0 : menuWidth,
            menuWidth,
            colors: {
                purple1: '#6d00d7',
                grey1: '#222222',
                orange1: '#fe630c'
            }
        };
    }, [isMobile]);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>)
    ;
};


export default StyledComponentsThemeProvider;



