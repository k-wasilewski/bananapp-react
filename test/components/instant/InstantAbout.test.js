import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import InstantAbout from "../../../src/components/instant/InstantAbout";
import {Provider} from "react-redux";

describe("InstantAbout rendering specification", () => {
    it('InstantAbout is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantAbout />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});