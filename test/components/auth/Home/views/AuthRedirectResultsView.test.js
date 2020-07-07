import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import AuthRedirectResultsView from "../../../../../src/components/auth/Home/views/AuthRedirectResultsView";
import {Provider} from "react-redux";

describe("AuthRedirectResultsView rendering specification", () => {
    it('AuthRedirectResultsView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthRedirectResultsView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});