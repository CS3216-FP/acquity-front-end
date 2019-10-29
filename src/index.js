import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'app';
import AppProviders from 'contexts';

import * as Sentry from '@sentry/browser';
import * as serviceWorker from './serviceWorker';
import './index.scss';

import store from './app/store';

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppProviders>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProviders>
    </Provider>,
    document.getElementById('root')
  );
};

Sentry.init({
  dsn: 'https://e5e6a8412b6046599f94e02311ff16f3@sentry.io/1800803'
});

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
