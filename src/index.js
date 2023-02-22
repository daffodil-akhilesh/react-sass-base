import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from '@loadable/component';
import { Provider } from "react-redux";
import { hydrateRoot } from 'react-dom/client';

import App from './components/App';
import { configureStore } from "./store";

const store = configureStore();
const container = document.getElementById('root');

// ReactDOM.hydrate(
  //   <Provider store={store}>
  //     <BrowserRouter basename="/">
  //       <App />
  //     </BrowserRouter>
  //   </Provider>,
  //   document.getElementById('root')
  // );

loadableReady(() => {
  hydrateRoot(container,
    <Provider store={store}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Provider>);
});
