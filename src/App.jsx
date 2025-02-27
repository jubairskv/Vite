import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import appRouter from "./Router/Router";
import LoadingScreen from "./Pages/Loading/LodingScreen";
import "./App.css";

function App() {
  return (
    <Provider store={Store}>
      <ToastContainer />
      <div className="App ">
        <LoadingScreen>
          <RouterProvider router={appRouter} />
        </LoadingScreen>
      </div>
    </Provider>
  );
}

export default App;
