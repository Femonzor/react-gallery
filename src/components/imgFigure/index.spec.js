import React from "react";
import ImgFigure from "./index.js";
import { shallow } from "enzyme";

const setup = () => {
    const props = {
        data: {
            title: "Heaven of time",
            desc: "Here he comes Here comes Speed Racer.",
            imageUrl: "http://femonzor.github.io/resource/react-gallery/1.jpg"
        },
        arrange: {
            pos: {
                left: 30,
                top: 60
            },
            rotate: 25,
            isInverse: false,
            isCenter: false
        },
        inverse: jest.fn(),
        center: jest.fn()
    };

    const wrapper = shallow(<ImgFigure {...props} />);

    return {
        props,
        wrapper
    };
}

describe("components", () => {
    describe("ImgFigure", () => {
        it("should render correctly", () => {
            const { wrapper } = setup();
            expect(wrapper.find("img").length).toBe(1);
        });
    });
});