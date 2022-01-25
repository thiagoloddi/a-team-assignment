import React from 'react';
import styled from 'styled-components';
import ReduxProvider from '../providers/ReduxProvider';
import StyledComponentsThemeProvider, { TAppTheme } from '../providers/StyledComponentsThemeProvider';
import Projects from './pages/projects/Projects';
import Menu from './shared/menu/Menu';

const StyledContent = styled.div`
  > * {
    display: inline-block;

    &.content {
      position: relative;
      width: ${({ theme }: { theme: TAppTheme }) => theme.contentWidth};
      margin-left: ${({ theme }: { theme: TAppTheme }) => theme.contentMargin}px;
      padding-bottom: 24px;
    }
  }
`;

const App: React.FC = () => {
  return (
    <ReduxProvider>
      <StyledComponentsThemeProvider>
        <StyledContent>
          <div className='menu'>
            < Menu />
          </div>
          <div className='content'>
              <Projects />
          </div>
        </StyledContent>
      </StyledComponentsThemeProvider>
    </ReduxProvider>
  );
}

export default App;
