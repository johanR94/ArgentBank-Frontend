import axios from "axios";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "./types";

export const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});
export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});
export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const fetchUserData = (token) => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const response = await axios.get(
      "http://localhost:3001/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = response.data.body;
    dispatch(fetchUserSuccess(userData));
  } catch (error) {
    dispatch(
      fetchUserFailure(
        error.response?.data?.message || "Failed to fetch user data"
      )
    );
  }
};

export const updateUserData = (token, userData) => async (dispatch) => {
  dispatch(updateUserRequest());
  try {
    if (!userData || !userData.userName) {
      throw new Error("Invalid user data: 'userName' is required.");
    }

    const response = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const updatedUserData = response.data.body;
    dispatch(updateUserSuccess(updatedUserData));
    return updatedUserData; // Return the updated user data if needed
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update user data";
    dispatch(updateUserFailure(errorMessage));
    throw new Error(errorMessage);
  }
};
