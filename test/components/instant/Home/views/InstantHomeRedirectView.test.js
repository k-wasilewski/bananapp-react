import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import InstantHomeRedirectView from "../../../../../src/components/instant/Home/views/InstantHomeRedirectView";
import {Provider} from "react-redux";

describe("InstantHomeRedirectView rendering specification", () => {
    it('InstantHomeRedirectView is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHomeRedirectView />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});