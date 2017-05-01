import React, { Component, PropTypes } from "react";
import "./index.less";

class ImgFigure extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        if (this.props.arrange.isCenter) this.props.inverse();
        else this.props.center();
        e.stopPropagation();
        e.preventDefault();
    }
    render() {
        const { data, arrange } = this.props;
        const { imageUrl, title, desc } = data;
        const { pos, rotate, isInverse, isCenter } = arrange;
        let styleObj = pos || {};
        let imgFigureClassName = "img-figure";
        imgFigureClassName += isInverse ? " is-inverse" : "";
        if (rotate) {
            ["Moz", "Ms", "Webkit", ""].forEach(item => {
                let prop = item ? item + "Transform" : "transform";
                styleObj[prop] = `rotate(${rotate}deg)`;
            });
        }
        if (isCenter) {
            styleObj.zIndex = 11;
        }
        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={imageUrl} alt={title} />
                <figcaption className="fig-caption">
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