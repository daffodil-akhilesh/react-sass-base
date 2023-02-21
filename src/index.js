import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from './components/App';
import { loadableReady } from '@loadable/component';

loadableReady(() => {
  ReactDOM.hydrate(
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  );
});
