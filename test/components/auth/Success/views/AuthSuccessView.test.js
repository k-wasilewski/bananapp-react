import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import AuthSuccessView from "../../../../../src/components/auth/Success/views/AuthSuccessView";
import {Provider} from "react-redux";

describe("AuthSuccessView rendering specification", () => {
    it('AuthSuccessView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthSuccessView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});