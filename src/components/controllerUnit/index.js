import React, { Component, PropTypes } from "react";
import ClassNames from "classnames";
import "./index.less";

const propTypes = {
    arrange: PropTypes.object,
    inverse: PropTypes.func,
    center: PropTypes.func
};

class ControllerUnit extends Component {
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

ControllerUnit.propTypes = propTypes;

export default ControllerUnit;