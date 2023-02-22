import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ChunkExtractor } from '@loadable/server';
import path from "path";
import fs from "fs";
import { Provider } from "react-redux";
import App from "../src/components/App";

const statsFile = path.resolve('./build/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile });

export const renderPage = (req, res, store, hasPreloadedState) => {
  let preloadedState = {};
  if (hasPreloadedState) {
    preloadedState = store.getState();
  }
  const jsx = extractor.collectChunks(
    <Provider store={store}>
      <StaticRouter location={req.url} basename={'/'}>
        <App />
      </StaticRouter>
    </Provider>);
  
  const reactDataToHtml = ReactDOMServer.renderToString(jsx);
  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();

  fs.readFile(path.resolve("./build/index.html"), (err, data) => {
    data = data.toString();
    if (err) res.json(JSON.stringify(err));
    else {
      data = data.replace(`<div id="root">`, `<div id="root">${reactDataToHtml}`);
      data = data.replace(`</body>`, `${scriptTags}</body>`);
      data = data.replace(`</body>`, `<script>window.PRELOADED_STATE=${JSON.stringify(preloadedState)}</script></body>`);
      data = data.replace(`</head>`, `${styleTags}</head>`);
      data = data.replace(`</head>`, `${linkTags}</head>`);

      if (!res.headersSent) {
        return res.send(data);
      }
    }
  });
};