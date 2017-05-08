import * as actionTypes from "../constants/ActionTypes";
import config from "../config";

const fetchImages = () => {
    return dispatch => {
        let imagesData = require("../data/imagesData.json");
        imagesData.forEach(item => {
            item.info.imageUrl = `${config.resourcePrefix}/${item.info.fileName}`;
            item.pos = {
                top: 0,
                left: 0
            };
            item.rotate = 0;
            item.isCenter = false;
            item.isInverse = false;
        });
        dispatch(setImages(imagesData));
    };
};

const setImages = (imgsArrangeArr) => {
    return {
        type: actionTypes.IMAGES_UPDATE,
        payload: {
            imgsArrangeArr
        }
    };
};

const flipImage = (id, isInverse) => {
};

export default {
    fetchImages,
    setImages
};