import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return <ToastContainer />;
};

export const showToast = {
  success: (message: string) => toast.success(message, { position: "top-right" }),
  error: (message: string) => toast.error(message, { position: "top-right" }),
};

export default Toast;
