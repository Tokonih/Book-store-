import { Middleware } from "@reduxjs/toolkit";
import { showToast } from "../common/toast";

interface ReduxAction<T = string> {
  type: T;
  payload?: any;
}

export const errorMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  if (
    (action as ReduxAction).type &&
    (action as ReduxAction).type.endsWith("FAIL")
  ) {
    const typedAction = action as ReduxAction; 
    console.error("Redux Error:", typedAction.payload);
    showToast.error(typedAction.payload || "An error occurred. Please try again.")
  }
  return next(action);
};
