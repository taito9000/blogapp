import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Helmet } from 'react-helmet-async';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Helmet>
      <AuthProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
