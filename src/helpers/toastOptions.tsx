import { ToastOptions, Slide } from "react-toastify";

const toastOptions: ToastOptions = {
  toastId: 0,
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
  style: {
    textAlign: "center",
  },
};

export default toastOptions;
