import React, { Component, PropTypes } from "react";
import "./index.less";

class ImgFigure extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.inverse();
        e.stopPropagation();
        e.preventDefault();
    }
    render() {
        const { data, arrange } = this.props;
        const { imageUrl, title, desc } = data;
        const { pos, rotate, isInverse } = arrange;
        let styleObj = pos || {};
        let imgFigureClassName = "img-figure";
        imgFigureClassName += isInverse ? " is-inverse" : "";
        if (rotate) {
            ["Moz", "Ms", "Webkit", ""].forEach(item => {
                let prop = item ? item + "Transform" : "transform";
                styleObj[prop] = `rotate(${rotate}deg)`;
            });
        }
        return (
            <figure className={imgFigureClassName} style={styleObj}>
                <img src={imageUrl} alt={title} />
                <figcaption className="fig-caption" onClick={this.handleClick}>
                    <h2 className="img-title">{title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>{desc}</p>
                    </div>
                </figcaption>
            </figure>
        );
    }
}

export default ImgFigure;