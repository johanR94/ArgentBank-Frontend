import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import authMiddleware from "../middleware/authMiddleware";
import loginReducer from "../reducers/login.reducer";
import userReducer from "../reducers/user.reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer   
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunk, authMiddleware),
    devTools: process.env.NODE_ENV !== "production",
  });

export default store;