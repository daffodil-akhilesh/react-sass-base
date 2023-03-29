import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage("./authDir");

export default function authenticate(req, res, next){
  const authToken = req.headers["authorization"];
  const AUTH_TOKEN = localStorage.getItem("PAYTM_AUTH_TOKEN");
  const forbiddenResponse = { message: "Not Authorized" };
  if (req.originalUrl.includes("getAuthenticationToken") && !AUTH_TOKEN) next();
  else if (authToken !== AUTH_TOKEN) res.status(403).send(JSON.stringify(forbiddenResponse));
  else next();
};