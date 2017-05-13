import React, { Component } from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";
import { is } from "immutable";
import "./index.less";

class ImgFigure extends Component {
    static propTypes = {
        data: PropTypes.object,
        inverse: PropTypes.func,
        center: PropTypes.func
    }
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.data.get("isCenter") ? this.props.inverse() : this.props.center();
        e.stopPropagation();
        e.preventDefault();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(this.props.data, nextProps.data);
    }
    render() {
        const
            { data } = this.props,
            info = data.get("info"),
            pos = data.get("pos"),
            rotate = data.get("rotate"),
            isInverse = data.get("isInverse"),
            isCenter = data.get("isCenter"),
            imageUrl = info.get("imageUrl"),
            title = info.get("title"),
            desc = info.get("desc"),
            imgFigureClassName = ClassNames({
                "img-figure": true,
                "is-inverse": isInverse
            });
        let styleObj = {};
        if (pos) {
            styleObj.left = pos.get("left");
            styleObj.top = pos.get("top");
        }
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