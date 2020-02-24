import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
const notificationOptions = {
  silent: true
};
const config = {
  onSuccess: (registration: ServiceWorkerRegistration) => {
    registration.showNotification(
      "Content available oflline.",
      notificationOptions
    );
  },
  onUpdate: (registration: ServiceWorkerRegistration) => {
    registration.showNotification(
      "New content loaded. Close all tabs related to this page and reload to update.",
      notificationOptions
    );
  }
};
serviceWorker.register(config);
