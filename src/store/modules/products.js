const FETCH_PRODUCTS_PROGRESS = "products/FETCH_PRODUCTS_PROGRESS";
const FETCH_PRODUCTS_SUCCESS = "products/FETCH_PRODUCTS_SUCCESS";
const FETCH_PRODUCTS_FAILED = "products/FETCH_PRODUCTS_FAILED";

const intialState = {
  products: [],
  isProductsFetched: false,
  isLoading: false,
  isError: false,
};

const getReducer = {
  [FETCH_PRODUCTS_PROGRESS]: ({ state, action }) => (
    {
      ...state,
      isLoading: true,
    }
  ),
  [FETCH_PRODUCTS_SUCCESS]: ({ state, action: { payload } }) => (
    {
      ...state,
      ...payload,
      isLoading: false,
      isUserFetched: true,
    }
  ),
  [FETCH_PRODUCTS_FAILED]: ({ state, action }) => (
    {
      ...state,
      isLoading: false,
      isError: true,
    }
  ),
};

export default (state = intialState, action) => {
  const { type } = action;
  const reducerAction = type && getReducer[type];
  return reducerAction ? reducerAction({ state, action }) : state;
}
