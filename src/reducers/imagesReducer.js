import * as actionTypes from "../constants/ActionTypes";
import imageReducer from "./imageReducer";
import { fromJS } from "immutable";

const initState = fromJS({
    imgsArrangeArr: []
});

const imagesReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.IMAGES_UPDATE:
            state = state.set("imgsArrangeArr", fromJS(action.payload.imgsArrangeArr));
            return state;
        case actionTypes.IMAGE_FLIP:
            state = state.setIn(
                        ["imgsArrangeArr", action.payload.idx],
                        imageReducer(state.getIn(["imgsArrangeArr", action.payload.idx]), action));
            return state;
        default:
            return state;
    }
};

export default imagesReducer;