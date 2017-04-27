import React, { Component, PropTypes } from "react";
import "./index.less";

class ImgFigure extends Component {
    render() {
        const { data } = this.props;
        const { imageUrl, title } = data;
        return (
            <figure className="img-figure">
                <img src={imageUrl} alt={title} />
                <figcaption className="fig-caption">
                    <h2 className="img-title">{title}</h2>
                </figcaption>
            </figure>
        );
    }
}

export default ImgFigure;