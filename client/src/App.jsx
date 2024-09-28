import React, { useEffect } from "react";
import Simulator from "./pages/Simulator";
import { ToastContainer } from "react-toastify";
import { registerLmcLanguage } from "./utils/lmcLanguage";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useEffect(() => {
    registerLmcLanguage();
  }, []);

  return (
    <div>
      <Simulator />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </div>
  );
};

export default App;
