import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import AuthLogoutView from "../../../../../src/components/auth/Success/views/AuthLogoutView";
import {Provider} from "react-redux";

describe("AuthLogoutView rendering specification", () => {
    it('AuthLogoutView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthLogoutView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});