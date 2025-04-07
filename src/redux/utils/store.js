import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import authMiddleware from "../middleware/authMiddleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});


store.dispatch({ type: "INIT_APP" });
export default store;