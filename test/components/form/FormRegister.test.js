import React from 'react';
import renderer from 'react-test-renderer';
import store from '../../../src/redux/store';
import {BrowserRouter} from "react-router-dom";
import {FormRegister} from "../../../src/components/form/FormRegister";
import {Provider} from "react-redux";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";

describe("FormRegister rendering specification", () => {
    it('FormRegister is rendered', () => {
        const component = renderer.create(
            <Provider store={store}>
                <BrowserRouter>
                    <FormRegister/>
                </BrowserRouter>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("FormRegister functional specification", () => {
    let component;

    beforeEach(() => {
        configure({adapter: new Adapter()});
    });

    afterEach(() => {
        component.unmount();
    });

    it('renders success msg when state value redirect equals "success"', (done) => {
        const mock = new MockAdapter(axios);
        const okResp = 'success';
        mock.onPost().reply(200, okResp);

        component = mount(
            <Provider store={store}>
                <FormRegister/>
            </Provider>
        );

        const email = "test@test.pl";
        const password = "test";
        component.find('#emailField').simulate('change', { target: { value: email } });
        component.find('#passwordField').simulate('change', { target: { value: password } });
        act(() => {
            component.find('#form').at(0).simulate('submit');
        });
        component.update();

        setTimeout(function () {
            expect(component.find('#msg').html())
                .toContain('Registration success');
            done();
        }, 500);
    });

    it('renders fail msg when state value redirect doesnt equal "success"', (done) => {
        const mock = new MockAdapter(axios);
        const failResp = 'fail';
        mock.onPost().reply(200, failResp);

        component = mount(
            <Provider store={store}>
                <FormRegister/>
            </Provider>
        );

        const email = "test@test.pl";
        const password = "test";
        component.find('#emailField').simulate('change', { target: { value: email } });
        component.find('#passwordField').simulate('change', { target: { value: password } });
        act(() => {
            component.find('#form').at(0).simulate('submit');
        });
        component.update();

        setTimeout(function () {
            expect(component.find('#msg').html())
                .toContain('Registration failed');
            done();
        }, 500);
    });
});