import React, { Component, PropTypes } from "react";

class ImgFigure extends Component {
    render() {
        const { data } = this.props;
        const { imageUrl, title } = data;
        return (
            <figure>
                <img src={imageUrl} alt={title} />
                <figcaption>
                    <h2>{title}</h2>
                </figcaption>
            </figure>
        );
    }
}

export default ImgFigure;