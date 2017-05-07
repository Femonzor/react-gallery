import * as actionTypes from "../constants/ActionTypes";
import imageReducer from "./imageReducer";

const initState = {
    imgsArrangeArr: []
};

const imagesReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.IMAGES_FETCH:
            return { ...state, ...{
                imgsArrangeArr: action.payload.imgsArrangeArr
            } };
        case actionTypes.IMAGE_UPDATE:
            return { ...state, ...{
                [action.payload.id]: imageReducer(state[action.payload.id], action)
            } };
        default:
            return state;
    }
};

export default imagesReducer;