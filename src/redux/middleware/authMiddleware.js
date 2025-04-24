import { loginSuccess } from "../actions/login.actions";
import { fetchUserData } from "../actions/user.actions";

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === "INIT_APP") {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");

    // Check if the token is present in localStorage or sessionStorage
    const currentToken = store.getState().login?.token || null; // check if the token is already in the store
    const userDataLoaded = store.getState().user?.data || null; // check if user data is already loaded

    // If the token is present and different from the current token in the store, dispatch loginSuccess and fetchUserData actions
    if (token && token !== currentToken && !userDataLoaded) {
      try {
        store.dispatch(loginSuccess(token)); // Dispatch loginSuccess action with the token
        store.dispatch(fetchUserData(token)); // Dispatch fetchUserData action to fetch user data from the server
      } catch (error) {
        console.error("AuthMiddleware: Error dispatching actions:", error);
      }
    }
  }

  return next(action);
};

export default authMiddleware;
