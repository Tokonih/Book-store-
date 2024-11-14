import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store/store";
import axios from "axios";
import ErrorBoundary from "./components/errorBandary";
import { showToast } from "./common/toast";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Global API error:", error);
    showToast.error("Something went wrong. Please try again later.")
    return Promise.reject(error);
  }
);

window.onerror = (message, source, lineno, colno, error) => {
  console.error("Uncaught error:", message, error);
  showToast.error("An unexpected error occurred!")
  // alert("An unexpected error occurred!");
};

window.onunhandledrejection = (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  showToast.error("Something went wrong. Please try again later.")
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
