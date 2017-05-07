import * as actionTypes from "../constants/ActionTypes";
import config from "../config";

const fetchImages = () => {
    return dispatch => {
        let imagesData = require("../data/imagesData.json");
        imagesData.forEach(item => {
            item.imageUrl = `${config.resourcePrefix}/${item.fileName}`;
        });
        dispatch(setImages(imagesData));
    };
};

const setImages = (imgsArrangeArr) => {
    return {
        type: actionTypes.IMAGES_FETCH,
        payload: {
            imgsArrangeArr
        }
    };
};

export default {
    fetchImages,
    setImages
};