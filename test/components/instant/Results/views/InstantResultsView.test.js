import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import InstantResultsView from "../../../../../src/components/instant/Results/views/InstantResultsView";

describe("InstantResultsView rendering specification", () => {
    it('InstantResultsView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantResultsView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});