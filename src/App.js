import "./styles/style.less";
import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./stores";
import App from "./containers";

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#app")
);