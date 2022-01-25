import { ButtonProps } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import useScreenSize from '../../../hooks/useScreenSize';
import { TAppTheme } from '../../../providers/StyledComponentsThemeProvider';

type TProps = {
    icon: React.ReactElement;
    label: string;
} & ButtonProps;

const StyledActionButton = styled.button`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-cotent: center;
    border: none;
    background-color: transparent;
    color: ${({ theme }: { theme: TAppTheme }) => theme.colors.orange1};
    font-size: 18px;
    font-weight: 500;

    span > * {
        height: 32px;
        width: 32px;
        margin-right: 6px;
    }
`;

const ActionButton: React.FC<TProps> = ({ icon, label, ...props }) => {
    const { isMobile } = useScreenSize();

    return (
        <StyledActionButton {...props}>
            <span>{icon}</span>
            {!isMobile && label}
        </StyledActionButton>
    );
}

export default ActionButton;