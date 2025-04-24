import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/utils/store.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/*Wrap the App component with the Redux Provider*/}
    <App />
  </Provider>
);
