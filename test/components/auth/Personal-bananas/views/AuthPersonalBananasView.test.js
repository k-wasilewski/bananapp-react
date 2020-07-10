import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import AuthPersonalBananasView from "../../../../../src/components/auth/Personal-bananas/views/AuthPersonalBananasView";
import {Provider} from "react-redux";

describe("AuthPersonalBananasView rendering specification", () => {
    it('AuthPersonalBananasView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthPersonalBananasView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});