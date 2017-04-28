import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import ImgFigure from "../imgFigure";
import config from "../../config";
import "./index.less";

const imagesData = require("../../data/imagesData.json");

(array => {
    array.forEach(item => {
        item.imageUrl = `${config.resourcePrefix}/${item.fileName}`;
    });
})(imagesData);

/**
 * 获取区间内的随机值
 * @param  {number} low  区间最小值
 * @param  {number} high 区间最大值
 * @return {number}      区间内的随机数
 */
const getRangeRandom = (low, high) => {
    return Math.ceil(Math.random() * (high - low) + low);
};

class Gallery extends Component {
    constructor() {
        this.state = {
            imgsArrangeArr: []
        };
        this.constant = {
            centerPos: {
                left: 0,
                right: 0
            },
            hPosRange: {
                leftSecX: [0, 0],
                rightSecX: [0, 0],
                y: [0, 0]
            },
            vPosRange: {
                x: [0, 0],
                topY: [0, 0]
            }
        };
    }
    /**
     * 重新布局所有图片
     * @param  {number} centerIdx 指定居中排布哪个图片
     * @return {null}             无返回
     */
    rearrange(centerIdx) {
        const
            { imgsArrangeArr } = this.state,
            { constant } = this,
            { centerPos, hPosRange, vPosRange } = constant,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,
            imgsArrangeTopArr = [],
            topImgNum = Math.ceil(Math.random() * 2),
            topImgSpliceIdx = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIdx, 1);
        // 首先居中 centerIdx 的图片
        imgsArrangeCenterArr[0].pos = centerPos;
        // 取出要布局上侧的图片的状态信息
        topImgSpliceIdx = Math.ceil(Math.random() * (imgs.imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIdx, topImgNum);
        // 布局位于上侧的图片
        imgsArrangeTopArr.forEach((item, idx) => {
            imgsArrangeTopArr[idx].pos = {
                top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[0]),
                left: getRangeRandom(vPosRangeX[0], vPosRangeX[0])
            };
        });
        // 布局左右两侧的图片
    }
    componentDidMount() {
        const
            stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2)
            imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0)
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);
        this.constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        };
        // 计算左侧、右侧区域图片排布位置的取值范围
        this.constant.hPosRange.leftSecX = [-halfImgW, halfStageW - halfImgW * 3];
        this.constant.hPosRange.rightSecX = [halfStageW + halfImgW, stageW - halfImgW];
        this.constant.hPosRange.y = [-halfImgH, stageH - halfImgH];
        // 计算上侧区域图片排布位置的取值范围
        this.constant.vPosRange.topY = [-halfImgH, halfStageH - halfImgH * 3];
        this.constant.vPosRange.x = [halfImgW - imgW, halfImgW];

        this.rearrange(0);
    }
    render() {
        let controllerUnits = [],
            imgFigures = [];
        imagesData.forEach((item, idx) => {
            if (!this.state.imgsArrangeArr[idx]) {
                this.state
            }
            imgFigures.push(<ImgFigure key={idx} data={item} ref={`imgFigure${idx}`} />);
        });
        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        )
    }
}

export default Gallery;