import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import express from "express";
import path from "path";
import fs from "fs";
import { ChunkExtractor } from '@loadable/server'

import App from "../src/components/App";

const app = express();
const PORT = process.env.PORT || 3500;


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));

app.use("*", (req, res, next) => {
  console.log(req.url);
  next();
})

app.get("*", (req, res) => {

  const statsFile = path.join(__dirname, './loadable-stats.json');
  const extractor = new ChunkExtractor({ statsFile });
  const jsx = extractor.collectChunks(<StaticRouter location={req.url}><App /></StaticRouter>)
  const reactDataToHtml = ReactDOMServer.renderToString(jsx);
  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();

  fs.readFile(path.join(__dirname, "/index.html"), (err, data) => {
    data = data.toString();
    if (err) res.json(JSON.stringify(err));
    else {
      data = data.replace(`<div id="root"></div>`, `<div id="root">${reactDataToHtml}</div>`);
      data = data.replace(`</body>`, `${scriptTags}</body>`);
      data = data.replace(`</head>`, `${styleTags}</head>`);
      if (!res.headersSent) {
        return res.send(data);
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT:${PORT}`);
});