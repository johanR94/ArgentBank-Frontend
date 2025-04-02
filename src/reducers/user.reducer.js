const initialState = {
  firstName: null,
  lastName: null,
  email: null,
  userName: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
      };

    case 'FETCH_USER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        ...action.payload, 
        loading: false,
        isLoggedIn: true, 
        
      };

    case 'FETCH_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
      case 'LOG_OUT':
        return {
          ...initialState,
        };
 
    default:
      return state;
  }
}