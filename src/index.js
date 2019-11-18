import React from 'react';
import ReactDOM from 'react-dom';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { PersistGate } from 'redux-persist/integration/react';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'app';
import AppProviders from 'contexts';

import * as Sentry from '@sentry/browser';
import * as serviceWorker from './serviceWorker';
import './index.scss';

import store, { persistor } from './app/store';

Modal.setAppElement('#root');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppProviders>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppProviders>
      </PersistGate>
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
  whyDidYouRender(React);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
