import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import InstantHomeView from "../../../../../src/components/instant/Home/views/InstantHomeView";
import {Provider} from "react-redux";

describe("InstantHomeLandingPageView rendering specification", () => {
    it('InstantHomeView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHomeView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});