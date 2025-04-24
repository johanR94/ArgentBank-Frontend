// This reducer handles the login state of the application.
// It manages the token, error messages, and the "Remember me" functionality.
// The reducer listens for actions dispatched from the login component and updates the state accordingly.
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REMEMBER_ME,
  LOG_OUT,
} from "../actions/types";

const initialState = {
  token: null,
  error: null,
  rememberMe: false,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, password: action.password, email: action.email };
    case LOGIN_SUCCESS:
      return { ...state, token: action.token, error: null };
    case LOGIN_FAILURE:
      return { ...state, token: null, error: action.error };
    case REMEMBER_ME:
      return { ...state, rememberMe: action.payload };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
