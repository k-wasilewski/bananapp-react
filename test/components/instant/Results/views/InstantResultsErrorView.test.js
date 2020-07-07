import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import InstantResultsErrorView from "../../../../../src/components/instant/Results/views/InstantResultsErrorView";

describe("InstantResultsErrorView rendering specification", () => {
    it('InstantResultsErrorView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantResultsErrorView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});