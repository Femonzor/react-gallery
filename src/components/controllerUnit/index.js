import React, { Component, PropTypes } from "react";
import "./index.less";

class ControllerUnit extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    render() {
        return <span className="controller-unit" onClick={this.handleClick}></span>
    }
}

export default ControllerUnit;