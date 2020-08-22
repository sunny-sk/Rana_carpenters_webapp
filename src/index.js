import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

import * as serviceWorker from "./serviceWorker";
import MainLoader from "./pages/MainLoader";

ReactDOM.render(
  <React.StrictMode>
    <>
      <MainLoader />
    </>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
