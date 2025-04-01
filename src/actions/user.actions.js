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
  console.log('Fetching user data with token:', token); 
  dispatch(fetchUserRequest());
  try {
    const response = await axios.get(
      'http://localhost:3001/api/v1/user/profile',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      
    );
    console.log('Token used for fetching user data:', token)
    console.log('Response:', response.data); 
    const userData = response.data.body; 
    dispatch(fetchUserSuccess(userData)); 
    console.log('User data fetched successfully:', userData); 
  } catch (error) {
            console.error('Error fetching user data:', error.response?.data || error.message); // Log de l'erreur
    dispatch(fetchUserFailure(error.response?.data?.message || 'Failed to fetch user data'));
  }
};