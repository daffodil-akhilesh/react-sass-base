import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import products from "./modules/products";
import userDetails from "./modules/userDetails";

const rootReducer = combineReducers({
  userDetails,
  products,
});

const composeEnhancers = process.env.BUILD_ENV === "development" && process.env.IS_BROWSER
  && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const logger = (state) => (next) => (action) => {
  const { type, payload } = action;
  console.log(`STATE: ${state}`, `ACTION: ${type}`, `PAYLOAD: ${payload}`)
  return next(action);
}

export const configureStore = (initialState = {}) => {
  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, logger)));
};