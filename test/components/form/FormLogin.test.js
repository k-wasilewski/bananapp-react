import React from 'react';
import renderer from 'react-test-renderer';
import store from '../../../src/redux/store';
import {BrowserRouter} from "react-router-dom";
import {FormLogin} from "../../../src/components/form/FormLogin";
import {Provider} from "react-redux";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";

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

    it('csdcsdcd', () => {
        component = mount(
            <Provider store={store}>
                <FormLogin/>
            </Provider>
        );

        //...
    });
});