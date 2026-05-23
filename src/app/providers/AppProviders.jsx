import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import { persistor, store } from '@/store';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';

export const AppProviders = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
