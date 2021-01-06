import React from 'react';
import store from "../src/redux/store";
import {BrowserRouter} from "react-router-dom";
import App from "../src/App";
import {Provider} from "react-redux";
import {render} from "react-dom";

describe("index rendering specification", () => {
    const root = document.createElement('div');

    beforeEach(() => {
        document.body.appendChild(root);

        const content = (
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );

        render(
            content,
            root
        );
    });

    it('index is rendered to "root" div', () => {
        expect(root.children.length).toBeGreaterThan(0);
    });
});