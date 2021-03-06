import "./index.less";
import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import ImgFigure from "../imgFigure";
import ControllerUnit from "../controllerUnit";
import actions from "../../actions";
import { fromJS } from "immutable";

/**
 * 获取区间内的随机值
 * @param  {number} low  区间最小值
 * @param  {number} high 区间最大值
 * @return {number}      区间内的随机数
 */
const getRangeRandom = (low, high) => {
    return Math.ceil(Math.random() * (high - low) + low);
};

/**
 * 获取 0~30° 之间的一个任意正负值
 * @return {number} 角度值
 */
const get30DegRandom = () => {
    return (Math.random() > 0.5 ? "" : "-") + Math.ceil(Math.random() * 30);
};

class Gallery extends Component {
    constructor() {
        super();
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
        this.rearrange = this.rearrange.bind(this);
        this.center = this.center.bind(this);
        this.updateConstant = this.updateConstant.bind(this);
        this.init = this.init.bind(this);
    }
    /**
     * 初始化
     * @return {null} 无
     */
    init() {
        const { imgsArrangeArr } = this.props;
        let flag = true;
        imgsArrangeArr.forEach(item => {
            if (item.get("isCenter")) flag = false;
        });
        // 如果所有图片都不在中心并且有图片，则需要初始化
        if (flag && imgsArrangeArr.size) this.updateConstant();
    }
    /**
     * 翻转图片
     * @param  {number} idx 当前被操作翻转的图片的索引值
     * @return {function}   一个真正待被执行的函数
     */
    inverse(idx) {
        return () => {
            let { dispatch, imgsArrangeArr } = this.props;
            dispatch(actions.flipImage(idx, !imgsArrangeArr.getIn([idx, "isInverse"])));
        }
    }
    /**
     * 利用rearrange函数，居中对应 idx 的图片
     * @param  {number} idx 图片索引
     * @return {function}   一个真正待被执行的函数
     */
    center(idx) {
        return () => {
            this.rearrange(idx);
        };
    }
    /**
     * 重新布局所有图片
     * @param  {number} centerIdx 指定居中排布哪个图片
     * @return {null}             无返回
     */
    rearrange(centerIdx) {
        const
            { constant, props } = this,
            { dispatch } = props,
            { centerPos, hPosRange, vPosRange } = constant,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,
            topImgNum = Math.floor(Math.random() * 2);
        let
            imgsArrangeArr = this.props.imgsArrangeArr.toJS(),
            imgsArrangeTopArr = [],
            topImgSpliceIdx = 0,
            imgsArrangeCenterArr,
            i, j, k,
            hPosRangeLORX;
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIdx, 1),
        // 首先居中 centerIdx 的图片
        imgsArrangeCenterArr[0] = { ...imgsArrangeCenterArr[0], ...{
            pos: centerPos,
            rotate: 0,
            isCenter: true
        } };
        // 取出要布局上侧的图片的状态信息
        topImgSpliceIdx = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIdx, topImgNum);
        // 布局位于上侧的图片
        imgsArrangeTopArr.forEach((item, idx) => {
            imgsArrangeTopArr[idx] = { ...imgsArrangeTopArr[idx], ...{
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[0]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[0])
                },
                rotate: get30DegRandom(),
                isCenter: false
            } };
        });
        // 布局左右两侧的图片
        for (i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            // 前半部分布局在左边，后半部分布局在右边
            hPosRangeLORX = i < k ? hPosRangeLeftSecX : hPosRangeRightSecX;
            imgsArrangeArr[i] = { ...imgsArrangeArr[i], ...{
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            } };
        }
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIdx, 0, imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIdx, 0, imgsArrangeCenterArr[0]);
        dispatch(actions.setImages(imgsArrangeArr));
    }
    updateConstant() {
        const
            stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2),
            imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
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
        this.constant.vPosRange.x = [halfStageW - imgW, halfStageW];
        this.rearrange(0);
    }
    componentDidMount() {
        this.init();
    }
    componentDidUpdate() {
        this.init();
    }
    render() {
        const { imgsArrangeArr } = this.props;
        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {
                        imgsArrangeArr.map((item, idx) => {
                            return <ImgFigure
                                       key={item.getIn(["info", "id"])}
                                       data={item}
                                       ref={"imgFigure" + idx}
                                       inverse={this.inverse(idx)}
                                       center={this.center(idx)} />
                        })
                    }
                </section>
                <nav className="controller-nav">
                    {
                        imgsArrangeArr.map((item, idx) => {
                            return <ControllerUnit
                                       key={item.getIn(["info", "id"])}
                                       data={item}
                                       inverse={this.inverse(idx)}
                                       center={this.center(idx)} />
                        })
                    }
                </nav>
            </section>
        )
    }
}

export default Gallery;