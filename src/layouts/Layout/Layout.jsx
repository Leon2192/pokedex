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
        <Brand to={brandPath} aria-label="Inicio de la Pokedex">
          <BrandMark aria-hidden="true" />
          <span>Pokedex</span>
        </Brand>

        <Nav aria-label="Navegacion principal">
          {navItems.map((item) => (
            <NavItem key={item.to} to={item.to} $isActive={pathname === item.to}>
              {item.label}
            </NavItem>
          ))}
        </Nav>

        <StatusPill $isOnline={isOnline}>
          <StatusDot $isOnline={isOnline} aria-hidden="true" />
          {isOnline ? 'En linea' : 'Sin conexion'}
        </StatusPill>
      </Shell>
    </Header>

    <Main>{children}</Main>

    <Toast toast={networkToast} />
  </AppChrome>
);

export default React.memo(Layout);
