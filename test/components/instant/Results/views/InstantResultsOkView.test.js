import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import InstantResultsOkView from "../../../../../src/components/instant/Results/views/InstantResultsOkView";

describe("InstantResultsOkView rendering specification", () => {
    it('InstantResultsOkView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantResultsOkView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});