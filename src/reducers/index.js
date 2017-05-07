import { combineReducers } from "redux";
import images from "./imagesReducer";

const rootReducer = combineReducers({
    images
});

export default rootReducer;