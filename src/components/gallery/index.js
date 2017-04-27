import React, { Component, PropTypes } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import config from "../../config";
import "./index.less";

const imagesData = require("../../data/imagesData.json");

(array => {
    array.forEach(item => {
        item.imageUrl = `${config.resourceSite}/${item.fileName}`;
    });
})(imagesData);

class Gallery extends Component {
    render() {
        return (
            <section className="stage">
                <section className="img-sec">
                </section>
                <nav className="controller-nav">
                </nav>
            </section>
        )
    }
}

export default Gallery;