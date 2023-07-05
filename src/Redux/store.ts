import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  deleteProfileReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  changePasswordReducer,
  userGetFavoriteMoviesReducer,
  userDeleteFavoriteMoviesReducer,
} from "./Reducers/userReducers";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  deleteProfileReducer: deleteProfileReducer,
  userChangePassword: changePasswordReducer,
  userGetFavoriteMovies: userGetFavoriteMoviesReducer,
  userDeleteFavoriteMovies: userDeleteFavoriteMoviesReducer,
});

//get userInfo from localstorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage?.getItem("userInfo") ?? "")
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
