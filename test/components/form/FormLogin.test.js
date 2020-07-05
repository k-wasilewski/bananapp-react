import React from 'react';
import renderer from 'react-test-renderer';
import store from '../../../src/redux/store';
import {BrowserRouter} from "react-router-dom";
import {FormLogin} from "../../../src/components/form/FormLogin";
import {Provider} from "react-redux";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Redirect} from 'react-router-dom';

describe("FormLogin rendering specification", () => {
    it('FormLogin is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <FormLogin/>
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("FormLogin functional specification", () => {
    let component;

    beforeEach(() => {
        configure({adapter: new Adapter()});
    });

    afterEach(() => {
        component.unmount();
    });

    it('renders form initially', () => {
        component = mount(
            <Provider store={store}>
                <FormLogin/>
            </Provider>
        );

        expect(component.find(<form/>)).not.toBeNull();
    });

    it('renders Redirect when state value redirect equals "success"', (done) => {
        const mock = new MockAdapter(axios);
        const okResp = 'success';
        mock.onPost().reply(200, okResp);

        component = mount(
            <Provider store={store}>
                <FormLogin/>
            </Provider>
        );

        const email = "test@test.pl";
        const password = "test";
        component.find('#emailField').simulate('change', { target: { value: email } });
        component.find('#passwordField').simulate('change', { target: { value: password } });
        component.update();

        setTimeout(function () {
            expect(component.find(<Redirect/>)).not.toBeNull();
            done();
        }, 500);
    });
});