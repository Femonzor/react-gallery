import React, { Component, PropTypes } from "react";
import ImgFigure from "../imgFigure";
import config from "../../config";
import "./index.less";

const imagesData = require("../../data/imagesData.json");

(array => {
    array.forEach(item => {
        item.imageUrl = `${config.resourcePrefix}/${item.fileName}`;
    });
})(imagesData);

class Gallery extends Component {
    render() {
        let controllerUnits = [],
            imgFigures = [];
        imagesData.forEach((item, idx) => {
            imgFigures.push(<ImgFigure key={idx} data={item} />);
        });
        return (
            <section className="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        )
    }
}

export default Gallery;