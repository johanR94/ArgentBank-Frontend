import axios from 'axios';
export const fetchUserRequest = () => ({
  type: 'FETCH_USER_REQUEST',
});

export const fetchUserSuccess = (userData) => ({
  type: 'FETCH_USER_SUCCESS',
  payload: userData,
});

export const fetchUserFailure = (error) => ({
  type: 'FETCH_USER_FAILURE',
  error,
});


export const fetchUserData = (token) => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const response = await axios.get(
      'http://localhost:3001/api/v1/user/profile',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      
    );
    const userData = response.data.body; 
    dispatch(fetchUserSuccess(userData)); 
  } catch (error) {
    dispatch(fetchUserFailure(error.response?.data?.message || 'Failed to fetch user data'));
  }
};