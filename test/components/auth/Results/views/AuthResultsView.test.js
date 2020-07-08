import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import AuthResultsView from "../../../../../src/components/auth/Results/views/AuthResultsView";

describe("AuthResultsView rendering specification", () => {
    it('AuthResultsView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthResultsView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});