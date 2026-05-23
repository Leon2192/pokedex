import React from 'react';
import Toast from '@/components/Toast';
import {
  AppChrome,
  Brand,
  BrandMark,
  Header,
  Main,
  Nav,
  NavItem,
  Shell,
  StatusDot,
  StatusPill,
} from './Layout.styled';

const Layout = ({ brandPath, children, isOnline, navItems, networkToast, pathname }) => (
  <AppChrome>
    <Header>
      <Shell>
        <Brand to={brandPath} aria-label="Pokedex home">
          <BrandMark aria-hidden="true" />
          <span>Pokedex</span>
        </Brand>

        <Nav aria-label="Main navigation">
          {navItems.map((item) => (
            <NavItem key={item.to} to={item.to} $isActive={pathname === item.to}>
              {item.label}
            </NavItem>
          ))}
        </Nav>

        <StatusPill $isOnline={isOnline}>
          <StatusDot $isOnline={isOnline} aria-hidden="true" />
          {isOnline ? 'Online' : 'Offline'}
        </StatusPill>
      </Shell>
    </Header>

    <Main>{children}</Main>

    <Toast toast={networkToast} />
  </AppChrome>
);

export default React.memo(Layout);
