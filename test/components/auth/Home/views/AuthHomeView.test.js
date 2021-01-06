import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import AuthHomeView from "../../../../../src/components/auth/Home/views/AuthHomeView";
import {Provider} from "react-redux";

describe("AuthHomeView rendering specification", () => {
    it('AuthHomeView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHomeView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});