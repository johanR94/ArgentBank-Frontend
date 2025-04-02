const initialState = {
  token: null,
  error: null,
  rememberMe: false,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        password: action.password,
        email: action.email,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.token,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        token: null,
        error: action.error,
      };

    case "REMEMBER_ME":
      return {
        ...state,
        rememberMe: action.payload,
      };
    case "LOG_OUT":
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
