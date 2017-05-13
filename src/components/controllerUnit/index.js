import React, { Component } from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";
import "./index.less";

class ControllerUnit extends Component {
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
    render() {
        const
            { data } = this.props,
            isInverse = data.get("isInverse"),
            isCenter = data.get("isCenter"),
            controllerUnitClassName = ClassNames({
                "controller-unit": true,
                "is-center": isCenter,
                "is-inverse": isInverse
            });
        return <span className={controllerUnitClassName} onClick={this.handleClick}></span>
    }
}

export default ControllerUnit;