import React from 'react';
import renderer from 'react-test-renderer';
import store from "../../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import Loading from "../../src/components/LoadingComponent";
import {Provider} from "react-redux";

describe("LoadingComponent rendering specification", () => {
    it('LoadingComonent is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <Loading />
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});