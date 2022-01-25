import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';

import { TAppTheme } from '../../../providers/StyledComponentsThemeProvider';
import MenuDesktop from './MenuDesktop';

const StyledMenu = styled(AppBar)`
    .MuiAppBar-root {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: ${({ theme }: { theme: TAppTheme }) => theme.colors.purple1};
        padding: 15px;

        img.logo {
            height: 20px;
            width: 110px;
        }

        .MuiButtonBase-root {
            position: absolute;
            left: 10px;
            top: 0;
            bottom: 0;
            margin: auto;
        }
    }
`;

const MenuMobile: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleDrawerToggle = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    return (
        <StyledMenu>
            <AppBar position="fixed">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                <img className="logo" src="/a-team-logo-2.svg" alt="a-team logo" />
            </AppBar>
            <Drawer
                container={window.document.body}
                variant="temporary"
                open={isOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                >
                    <MenuDesktop />
            </Drawer>
        </StyledMenu>
    )
}

export default MenuMobile;