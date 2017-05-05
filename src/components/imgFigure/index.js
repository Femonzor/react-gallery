import React, { Component, PropTypes } from "react";
import "./index.less";

class ImgFigure extends Component {
    static propTypes = {
        data: PropTypes.object,
        arrange: PropTypes.object,
        inverse: PropTypes.func,
        center: PropTypes.func
    }
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.arrange.isCenter ? this.props.inverse() : this.props.center();
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
            ["Moz", "ms", "Webkit", ""].forEach(item => {
                let prop = item ? item + "Transform" : "transform";
                styleObj[prop] = `rotate(${rotate}deg)`;
            });
        }
        if (isCenter) styleObj.zIndex = 11;
        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={imageUrl} alt={title} />
                <figcaption className="fig-caption">
                    <h2 className="img-title">{title}</h2>
                    <div className="img-back">
                        <p>{desc}</p>
                    </div>
                </figcaption>
            </figure>
        );
    }
}

export default ImgFigure;