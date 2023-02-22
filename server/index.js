import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import express from "express";
import path from "path";
import fs from "fs";
import { ChunkExtractor } from '@loadable/server'
import { Provider } from "react-redux";

import App from "../src/components/App";
import { configureStore } from "../src/store";

const app = express();
const PORT = process.env.PORT || 3500;
const store = configureStore();
const statsFile = path.resolve('./build/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile });


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));

app.get("*", (req, res, next) => {
  // logger
  next();
});

app.get("*", (req, res) => {
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
      data = data.replace(`</head>`, `${styleTags}</head>`);
      data = data.replace(`</head>`, `${linkTags}</head>`);
      if (!res.headersSent) {
        return res.send(data);
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT:${PORT}`);
});