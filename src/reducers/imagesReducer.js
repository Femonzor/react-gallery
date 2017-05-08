import * as actionTypes from "../constants/ActionTypes";
import imageReducer from "./imageReducer";

const initState = {
    imgsArrangeArr: []
};

const imagesReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.IMAGES_UPDATE:
            return { ...state, ...{
                imgsArrangeArr: action.payload.imgsArrangeArr
            } };
        default:
            return state;
    }
};

export default imagesReducer;