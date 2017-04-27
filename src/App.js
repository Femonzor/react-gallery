import "./styles/style.less";
import React, { Component, PropTypes } from "react";
import ReactDOM, { render } from "react-dom";
import Gallery from "./components/gallery";

render(
    <Gallery />,
    document.querySelector("#app")
);