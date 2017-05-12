import * as actionTypes from "../constants/ActionTypes";
import imageReducer from "./imageReducer";
import { fromJS } from "immutable";

const initState = {
    imgsArrangeArr: []
};

const imagesReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.IMAGES_UPDATE:
            return fromJS(state).set("imgsArrangeArr", action.payload.imgsArrangeArr).toJS();
        case actionTypes.IMAGE_FLIP:
            return fromJS(state)
                   .setIn(
                       ["imgsArrangeArr", action.payload.idx],
                       imageReducer(state.imgsArrangeArr[action.payload.idx], action))
                   .toJS();
        default:
            return state;
    }
};

export default imagesReducer;