import express from "express";
import path from "path";
import { configureStore } from "../src/store";
import { renderPage } from "./renderPage";
import PayTMRouter from "./routers/paytmRouter";

const app = express();
const PORT = process.env.PORT || 3500;
const store = configureStore();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));
app.use("/payment/paytm", PayTMRouter);

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