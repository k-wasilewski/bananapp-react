import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import AuthErrorView from "../../../../../src/components/auth/Results/views/AuthErrorView";

describe("AuthErrorView rendering specification", () => {
    it('AuthErrorView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthErrorView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});