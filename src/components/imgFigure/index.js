import React, { Component, PropTypes } from "react";
import "./index.less";

class ImgFigure extends Component {
    render() {
        const { data, arrange } = this.props;
        const { imageUrl, title } = data;
        const { pos, rotate } = arrange;
        let styleObj = pos || {};
        if (rotate) {
            ["Moz", "Ms", "Webkit", ""].forEach(item => {
                let prop = item ? item + "Transform" : "transform";
                styleObj[prop] = `rotate(${rotate}deg)`;
            });
        }
        return (
            <figure className="img-figure" style={styleObj}>
                <img src={imageUrl} alt={title} />
                <figcaption className="fig-caption">
                    <h2 className="img-title">{title}</h2>
                </figcaption>
            </figure>
        );
    }
}

export default ImgFigure;