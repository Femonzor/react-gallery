import React, { Component } from "react";
import { connect } from "react-redux";
import Gallery from "../components/gallery";
import actions from "../actions";

class App extends Component {
    componentDidMount() {
        const { dispatch, imgsArrangeArr } = this.props;
        if (!imgsArrangeArr.length) dispatch(actions.fetchImages());
    }
    render() {
        return <Gallery {...this.props} />
    }
};

const mapStateToProps = (state) => {
    const { images } = state;
    const { imgsArrangeArr } = images;
    return {
        imgsArrangeArr
    };
};

export default connect(mapStateToProps)(App);