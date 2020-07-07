import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import AuthFailView from "../../../../../src/components/auth/Success/views/AuthFailView";
import {Provider} from "react-redux";

describe("AuthFailView rendering specification", () => {
    it('AuthFailView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthFailView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});