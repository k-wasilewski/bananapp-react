import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import InstantLandingPageView from "../../../../../src/components/instant/Home/views/InstantLandingPageView";
import {Provider} from "react-redux";

describe("InstantHomeLandingPageView rendering specification", () => {
    it('InstantLandingPageView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantLandingPageView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});