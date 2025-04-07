import { loginSuccess } from "../actions/login.actions";
import { fetchUserData } from "../actions/user.actions";

const authMiddleware = (store) => (next) => (action) => {
    if (action.type === "INIT_APP") {
        const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");

        // Vérifiez si le token est déjà dans le store pour éviter les actions inutiles
        const currentToken = store.getState().login?.token;
        if (token && token !== currentToken) 
            try{
            store.dispatch(loginSuccess(token));
            store.dispatch(fetchUserData(token)); 

        }
        catch (error) {
            console.error("AuthMiddleware: Error dispatching actions:", error);
        }
    }

    return next(action);
};

export default authMiddleware;