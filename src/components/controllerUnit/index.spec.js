import React from "react";
import ControllerUnit from "./index.js";
import { shallow } from "enzyme";

const setup = () => {
    const props = {
        arrange: {
            pos: {
                left: 30,
                top: 60
            },
            rotate: 25,
            isInverse: false,
            isCenter: true
        },
        inverse: jest.fn(),
        center: jest.fn()
    };

    const wrapper = shallow(<ControllerUnit {...props} />);

    return {
        props,
        wrapper
    };
};

describe("components", () => {
    describe("ControllerUnit", () => {
        it("should render correctly", () => {
            const { wrapper } = setup();
            expect(wrapper.hasClass("is-center")).toBe(true);
        });
    });
});