import * as actionTypes from "../constants/ActionTypes";

const initState = {
    /**
     * 图片位置
     * @type {Object}
     */
    pos: {
        left: 0,
        top: 0
    },
    /**
     * 旋转角度
     * @type {Number}
     */
    rotate: 0,
    /**
     * 图片正反面
     * @type {Boolean}
     */
    isInverse: false,
    /**
     * 图片是否居中
     * @type {Boolean}
     */
    isCenter: false
};

const imageReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default imageReducer;