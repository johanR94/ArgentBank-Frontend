import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REMEMBER_ME,
  LOG_OUT,
} from "./types";
import { fetchUserData } from "./user.actions";

// This action handles the login functionality of the application
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (token) => ({ type: LOGIN_SUCCESS, token });
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, error });
export const rememberMe = (remember) => ({
  type: REMEMBER_ME,
  payload: remember,
});
export const logOut = () => ({ type: LOG_OUT });

export const login = (email, password, remember) => async (dispatch) => {
  //
  dispatch(loginRequest());
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      { email, password } // Send the email and password to the server for authentication
    );
    const { token } = response.data.body;

    dispatch(loginSuccess(token));
    // Store the token in localStorage or sessionStorage based on the rememberMe checkbox state
    if (remember) {
      localStorage.setItem("jwtToken", token);
    } else {
      sessionStorage.setItem("jwtToken", token);
    }
    dispatch(fetchUserData(token));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "Login failed"));
  }
};
