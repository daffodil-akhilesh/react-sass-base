import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { configureStore } from "../src/store";
import { renderPage } from "./renderPage";
import PayTMRouter from "./routers/paytmRouter";

const app = express();
const PORT = process.env.PORT || 3500;
const store = configureStore();
const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));

app.use("/payment/paytm", jsonParser, PayTMRouter);

app.get("*", (req, res, next) => {
  // logger
  next();
});

app.get("*", (req, res) => {
  renderPage(req, res, store, true);
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT:${PORT}`);
});