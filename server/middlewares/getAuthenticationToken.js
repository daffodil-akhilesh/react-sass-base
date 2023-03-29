import SHA256 from "crypto-js/sha256";
import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage("./authDir");
const SECRET_SALT = "SOME_SALT";

export default function getAuthenticationToken(_req, res, _next) {
  const currentTime = + (new Date()).getUTCMilliseconds()
  const AUTH_TOKEN = SHA256(currentTime + SECRET_SALT);
  localStorage.setItem("PAYTM_AUTH_TOKEN", AUTH_TOKEN);
  res.setHeader('secure-token', AUTH_TOKEN);
  res.status(200).send(JSON.stringify({
    message: "Authenticated",
  }));
};