import * as actionTypes from "../constants/ActionTypes";
import imageReducer from "./imageReducer";
import { fromJS } from "immutable";

const initState = {
    imgsArrangeArr: []
};

const imagesReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.IMAGES_UPDATE:
            // return { ...state, ...{
            //     imgsArrangeArr: action.payload.imgsArrangeArr
            // } };
            return fromJS(state).set("imgsArrangeArr", action.payload.imgsArrangeArr).toJS();
        default:
            return state;
    }
};

export default imagesReducer;