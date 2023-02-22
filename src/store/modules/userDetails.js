const FETCH_USER_DETAILS_PROGRESS = "userDetails/FETCH_USER_DETAILS_PROGRESS";
const FETCH_USER_DETAILS_SUCCESS = "userDetails/FETCH_USER_DETAILS_SUCCESS";
const FETCH_USER_DETAILS_FAILED = "userDetails/FETCH_USER_DETAILS_FAILED";

const intialState = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  isUserFetched: false,
  isLoading: false,
  isError: false,
};

export const getUserDetails = () => {
  return (dispatch) => {
    try {
      dispatch({
        type: FETCH_USER_DETAILS_PROGRESS
      });
      setTimeout(() => {
        const firstName = localStorage.getItem("firstName");
        const lastName = localStorage.getItem("lastName");
        const userName = localStorage.getItem("userName");
        const email = localStorage.getItem("email");
        dispatch({
          type: FETCH_USER_DETAILS_SUCCESS,
          payload: {
            firstName,
            lastName,
            userName,
            email
          }
        });
      }, 400);
    }
    catch (err) {
      dispatch({
        type: FETCH_USER_DETAILS_FAILED
      })
    }
  }
};

const getReducer = {
  [FETCH_USER_DETAILS_PROGRESS]: ({ state, action }) => (
    {
      ...state,
      isLoading: true,
    }
  ),
  [FETCH_USER_DETAILS_SUCCESS]: ({ state, action: { payload } }) => (
    {
      ...state,
      ...payload,
      isLoading: false,
      isUserFetched: true,
    }
  ),
  [FETCH_USER_DETAILS_FAILED]: ({ state, action }) => (
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
