import React, { Component, PropTypes } from "react";
import ClassNames from "classnames";
import "./index.less";

class ControllerUnit extends Component {
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
        const { arrange } = this.props;
        const { isInverse, isCenter } = arrange;
        const controllerUnitClassName = ClassNames({
            "controller-unit": true,
            "is-center": isCenter,
            "is-inverse": isInverse
        });
        return <span className={controllerUnitClassName} onClick={this.handleClick}></span>
    }
}

export default ControllerUnit;