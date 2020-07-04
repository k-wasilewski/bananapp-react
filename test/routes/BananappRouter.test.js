import React from 'react';
import {MemoryRouter} from "react-router-dom";
import store from "../../src/redux/store";
import {Provider} from "react-redux";
import App from "../../src/App";
import {mount, configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import InstantHome from "../../src/components/instant/Home/InstantHome";
import InstantResults from "../../src/components/instant/Results/InstantResults";
import AuthSuccess from "../../src/components/auth/Success/AuthSuccess";
import AuthResults from "../../src/components/auth/Results/AuthResults";
import AuthPersonalBananas from "../../src/components/auth/Personal-bananas/AuthPersonalBananas";
import InstantAbout from "../../src/components/instant/InstantAbout";
import {jest} from '@jest/globals';

describe("Router functional specification", () => {
    let component;
    const root = document.createElement('div');

    beforeEach(() => {
        configure({ adapter: new Adapter() });

        document.body.appendChild(root);
    });

    afterEach(() => {
        component.unmount();
    });

    it('component "InstantHome" is displayed when "/" url is passed', () => {
        component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(component.find(InstantHome)).toHaveLength(1);
    });

    it('component "InstantResults" is displayed when "/results" url is passed', () => {
        component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/results']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(component.find(InstantResults)).toHaveLength(1);
    });

    it('component "AuthSuccess" is displayed when "/success" url is passed', () => {
        component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/success']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(component.find(AuthSuccess)).toHaveLength(1);
    });

    it('component "AuthResults" is displayed when "/auth/results" url is passed', () => {
        component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/auth/results']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(component.find(AuthResults)).toHaveLength(1);
    });

    it('component "AuthPersonalBananas" is displayed when "/auth/personalBananas" url is passed', () => {
        component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/auth/personalBananas']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(component.find(AuthPersonalBananas)).toHaveLength(1);
    });

    it('component "InstantAbout" is displayed when "/about" url is passed', () => {
        component = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/about']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(component.find(InstantAbout)).toHaveLength(1);
    });
});