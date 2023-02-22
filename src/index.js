import React from "react";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from '@loadable/component';
import { Provider } from "react-redux";
import { hydrateRoot } from 'react-dom/client';

import App from './components/App';
import { configureStore } from "./store";

let preloadedState = {};
if (window.PRELOADED_STATE) {
  preloadedState = window.PRELOADED_STATE;
  delete window.PRELOADED_STATE;
}

const store = configureStore(preloadedState);
const container = document.getElementById('root');

loadableReady(() => {
  hydrateRoot(container,
    <Provider store={store}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Provider>);
});
