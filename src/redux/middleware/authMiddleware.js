import { loginSuccess } from "../actions/login.actions";
import { fetchUserData } from "../actions/user.actions";

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === "INIT_APP") {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");

    // Vérifie si le token est déjà dans le store
    const currentToken = store.getState().login?.token || null; // Récupère le token actuel du store
    const userDataLoaded = store.getState().user?.data || null; // Vérifie si les données utilisateur sont déjà chargées

    if (token && token !== currentToken && !userDataLoaded) {
      try {
        store.dispatch(loginSuccess(token));
        store.dispatch(fetchUserData(token));
      } catch (error) {
        console.error("AuthMiddleware: Error dispatching actions:", error);
      }
    }
  }

  return next(action);
};

export default authMiddleware;
