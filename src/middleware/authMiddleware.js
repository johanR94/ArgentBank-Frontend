import { loginSuccess } from "../actions/login.actions";

const authMiddleware = (store) => (next) => (action) => {
    if (action.type === "@@INIT") {
        const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
        if (token) {
            store.dispatch(loginSuccess(token));
        }
    }

    return next(action);
};

export default authMiddleware;