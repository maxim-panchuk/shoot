import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './toolkitRedux/main';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {PersistGate} from 'redux-persist/integration/react'
import { persistor } from './toolkitRedux/main';


ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

