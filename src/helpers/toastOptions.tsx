import { ToastOptions, Slide } from "react-toastify";

const toastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Slide,

  style: {
    fontFamily: "Noto Sans, sans-serif",
    textAlign: "center",
    boxShadow: "0 0 15px 0 #000",
  },
};

export default toastOptions;
