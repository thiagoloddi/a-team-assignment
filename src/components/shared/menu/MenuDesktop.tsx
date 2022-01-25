import React from 'react';
import styled from 'styled-components';

import { TAppTheme } from '../../../providers/StyledComponentsThemeProvider';

const StyledMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
    background-color: ${({ theme }: { theme: TAppTheme }) => theme.colors.purple1};
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;

    img {
        height: 40px;
        width: 40px;

        &.logo {
            margin: 50px 0;
        }
    }

    .icon-wrapper {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        cursor: pointer;
        user-select: none;
    }
`;

const MenuDesktop: React.FC = () => {
    return (
        <StyledMenu>
            <img className='logo' src="/a-team-logo-1.svg" alt="a-team logo" />
            <div className='icon-wrapper'>
                <img className='icon' src="/projects-icon.svg" alt="projects icon" />
                <span>Projects</span>
            </div>
        </StyledMenu>
    );
}

export default MenuDesktop;