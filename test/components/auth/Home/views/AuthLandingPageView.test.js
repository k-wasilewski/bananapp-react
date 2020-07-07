import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import AuthLandingPageView from "../../../../../src/components/auth/Home/views/AuthLandingPageView";
import {Provider} from "react-redux";

describe("AuthLandingPageView rendering specification", () => {
    it('AuthLandingPageView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthLandingPageView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});