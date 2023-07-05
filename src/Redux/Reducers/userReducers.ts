import * as userConstants from "../Constans/UserConstans";
import { PayloadAction } from "@reduxjs/toolkit";
//login
export const userLoginReducer = (state = {}, action: PayloadAction<string>) => {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST: {
      return { isLoading: true };
    }
    case userConstants.USER_LOGIN_SUCCESS: {
      return { isLoading: false, userInfo: action.payload, isSuccses: true };
    }
    case userConstants.USER_LOGIN_FAIL: {
      return { isLoading: false, isError: action.payload };
    }
    case userConstants.USER_LOGIN_RESET: {
      return {};
    }
    case userConstants.USER_LOGOUT: {
      return {};
    }
    default: {
      return state;
    }
  }
};

//register
export const userRegisterReducer = (
  state = {},
  action: PayloadAction<string>
) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST: {
      return { isLoading: true };
    }
    case userConstants.USER_REGISTER_SUCCESS: {
      return { isLoading: false, userInfo: action.payload, isSuccses: true };
    }
    case userConstants.USER_REGISTER_FAIL: {
      return { isLoading: false, isError: action.payload };
    }

    case userConstants.USER_REGISTER_RESET: {
      return {};
    }
    default: {
      return state;
    }
  }
};

//register
export const userUpdateProfileReducer = (
  state = {},
  action: PayloadAction<string>
) => {
  switch (action.type) {
    case userConstants.USER_UPDATE_PROFILE_REQUEST: {
      return { isLoading: true };
    }
    case userConstants.USER_UPDATE_PROFILE_SUCCESS: {
      return { isLoading: false, userInfo: action.payload, isSuccses: true };
    }
    case userConstants.USER_UPDATE_PROFILE_FAIL: {
      return { isLoading: false, isError: action.payload };
    }

    case userConstants.USER_UPDATE_PROFILE_RESET: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export const deleteProfileReducer = (
  state = {},
  action: PayloadAction<string>
) => {
  switch (action.type) {
    case userConstants.USER_DELETE_PROFILE_REQUEST: {
      return { isLoading: true };
    }
    case userConstants.USER_DELETE_PROFILE_SUCCESS: {
      return { isLoading: false, userInfo: action.payload, isSuccses: true };
    }
    case userConstants.USER_DELETE_PROFILE_FAIL: {
      return { isLoading: false, isError: action.payload };
    }

    case userConstants.USER_DELETE_PROFILE_RESET: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export const changePasswordReducer = (
  state = {},
  action: PayloadAction<string>
) => {
  switch (action.type) {
    case userConstants.USER_CHANGE_PASSWORD_REQUEST: {
      return { isLoading: true };
    }
    case userConstants.USER_CHANGE_PASSWORD_SUCCESS: {
      return {
        isLoading: false,
        userInfo: action.payload,
        isSuccses: true,
        message: action.payload,
      };
    }
    case userConstants.USER_CHANGE_PASSWORD_FAIL: {
      return { isLoading: false, isError: action.payload };
    }

    case userConstants.USER_CHANGE_PASSWORD_RESET: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export const userGetFavoriteMoviesReducer = (
  state = {
    likedMovies: [],
  },
  action: PayloadAction<string>
) => {
  switch (action.type) {
    case userConstants.GET_FAVORITE_MOVIES_REQUEST: {
      return { isLoading: true };
    }
    case userConstants.GET_FAVORITE_MOVIES_SUCCESS: {
      return {
        isLoading: false,
        likedMovies: action.payload,
      };
    }
    case userConstants.GET_FAVORITE_MOVIES_FAIL: {
      return { isLoading: false, isError: action.payload };
    }

    case userConstants.GET_FAVORITE_MOVIES_RESET: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export const userDeleteFavoriteMoviesReducer = (
  state = {},
  action: PayloadAction<string>
) => {
  switch (action.type) {
    case userConstants.DELETE_FAVORITE_REQUEST: {
      return { isLoading: true };
    }
    case userConstants.DELETE_FAVORITE_SUCCESS: {
      return {
        isLoading: false,
        likedMovies: action.payload,
      };
    }
    case userConstants.DELETE_FAVORITE_FAIL: {
      return { isLoading: false, isError: action.payload };
    }

    case userConstants.DELETE_FAVORITE_RESET: {
      return {};
    }
    default: {
      return state;
    }
  }
};

//ADMIN GET ALL USERS
export const adminGetAllUsersReducer = (
  state = {
    users: [],
  },
  action: PayloadAction<string>
) => {
  switch (action.type) {
    case userConstants.GET_ALL_USERS_REQUEST: {
      return { isLoading: true };
    }
    case userConstants.GET_ALL_USERS_SUCCESS: {
      return {
        isLoading: false,
        users: action.payload,
      };
    }
    case userConstants.GET_ALL_USERS_FAIL: {
      return { isLoading: false, isError: action.payload };
    }

    case userConstants.GET_ALL_USERS_RESET: {
      return {
        users: [],
      };
    }
    default: {
      return state;
    }
  }
};
