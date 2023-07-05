import * as userConstants from "../Constans/UserConstans";
import * as userApi from "../APIs/userServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "Redux/Reducers/Protection";

// login action
const loginAction = (datas) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.USER_LOGIN_REQUEST,
    });
    const responce = await userApi.loginService(datas);
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: responce,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

// register action
const registerAction = (datas) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.USER_REGISTER_REQUEST,
    });
    const responce = await userApi.registerService(datas);
    dispatch({
      type: userConstants.USER_REGISTER_SUCCESS,
      payload: responce,
    });
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: responce,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

const logoutAction = () => (dispatch) => {
  userApi.logoutService();
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.USER_LOGIN_RESET });
  dispatch({ type: userConstants.USER_REGISTER_RESET });
};

// update action
const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_REQUEST,
    });
    const responce = await userApi.updateProfileService(
      user,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: responce,
    });
    toast.success("Profile Updated");
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: responce,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

// delete action
const deleteProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_DELETE_PROFILE_REQUEST,
    });
    await userApi.deleteProfileService(tokenProtection(getState));
    dispatch({
      type: userConstants.USER_DELETE_PROFILE_SUCCESS,
    });
    toast.success("Profile deleted");
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
    dispatch({
      type: userConstants.USER_DELETE_PROFILE_RESET,
    });
  }
};

// delete action
const changePasswordAction = (password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_REQUEST,
    });
    const response = await userApi.changePasswordService(
      password,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
    toast.success("Password changed");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
  }
};

const getFavoriteMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.GET_FAVORITE_MOVIES_REQUEST,
    });
    const response = await userApi.getFavoriteMovies(tokenProtection(getState));
    dispatch({
      type: userConstants.GET_FAVORITE_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success("get all movies");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_FAVORITE_MOVIES_FAIL);
  }
};

const deleteFavoriteMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: userConstants.DELETE_FAVORITE_REQUEST,
    });
    await userApi.deleteFavoriteMovies(tokenProtection(getState));
    dispatch({
      type: userConstants.DELETE_FAVORITE_SUCCESS,
    });
    toast.success("Favorite Movies deleted");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
  }
};

export {
  loginAction,
  registerAction,
  logoutAction,
  updateProfileAction,
  deleteProfileAction,
  changePasswordAction,
  getFavoriteMoviesAction,
  deleteFavoriteMoviesAction,
};
