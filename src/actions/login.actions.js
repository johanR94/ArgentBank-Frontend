import axios from 'axios';
import { fetchUserData } from './user.actions';
  export const loginRequest = (email, password) => ({
      type: 'LOGIN_REQUEST',
        email,
        password,
  });
  
  export const loginSuccess = (token) => ({
      type: 'LOGIN_SUCCESS',
      token,
  });
  
  export const loginFailure = (error) => ({
      type: 'LOGIN_FAILURE',
      error,
  });
  export const rememberMe = () => ({
    type: 'REMEMBER_ME',
    rememberMe: true,
  });
  export const logOut = () => ({
    type: 'LOG_OUT',
  });

  export const login = (email, password,rememberMe) => async (dispatch) => {
      dispatch(loginRequest(email, password));
      try {
          const response = await axios.post('http://localhost:3001/api/v1/user/login', {
              email,
              password,
          });
          if (!email || !password) {
            return dispatch(loginFailure("Email ou mot de passe manquant"));
        }
          const { token } = response.data.body; 
          dispatch(loginSuccess(token));
          
          if (rememberMe) {
            localStorage.setItem('jwtToken', token); 
        } else {
            sessionStorage.setItem('jwtToken', token); 
            localStorage.removeItem('jwtToken');
        }
        dispatch(fetchUserData(token));
      } catch (error) {
          dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
      }
  };