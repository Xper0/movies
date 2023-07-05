import { logoutAction } from "Redux/Actions/userActions";
import * as userConstants from "../Constans/UserConstans";

export const ErrorsAction = (error, dispatch, action) => {
  const message =
    error.response && error.response.data.message
      ? error.responce.data.message
      : error.message;
  if (message === "Not authorized, token failed") {
    dispatch(logoutAction());
  }
  return dispatch({
    type: action,
    payload: message,
  });
};

// api token protection
export const tokenProtection = (getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  if (!userInfo?.token) {
    return null;
  } else {
    return userInfo?.token;
  }
};
