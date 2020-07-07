import React from 'react';
import store from '../../../../src/redux/store';
import {AuthSuccess} from "../../../../src/components/auth/Success/AuthSuccess";
import AuthFailView from "../../../../src/components/auth/Success/views/AuthFailView";
import AuthLogoutView from "../../../../src/components/auth/Success/views/AuthLogoutView";
import AuthSuccessView from "../../../../src/components/auth/Success/views/AuthSuccessView";
import {Provider} from "react-redux";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe("AuthSuccess functional specification", () => {
    let component;

    beforeEach(() => {
        configure({adapter: new Adapter()});
    });

    afterEach(() => {
        component.unmount();
    });

    it('renders AuthFailView when props value username equals 0', () => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthSuccess username={0} location={'mock'}/>
                </BrowserRouter>
            </Provider>
        );

        expect(component.find(AuthFailView)).toHaveLength(1);
    });

    it('renders AuthSuccessView when state value redir equals 0',
        (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthSuccess location={'mock'}/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthSuccess).instance().setState({redir: 0});
        component.update();

        setTimeout(function () {
            expect(component.find(AuthSuccessView)).toHaveLength(1);
            done();
        }, 500);
    });

    it('renders AuthLogoutView when state value redir equals "logout"',
        (done) => {
            component = mount(
                <Provider store={store}>
                    <BrowserRouter>
                        <AuthSuccess location={'mock'}/>
                    </BrowserRouter>
                </Provider>
            );

            component.find(AuthSuccess).instance().setState({redir: 'logout'});
            component.update();

            setTimeout(function () {
                expect(component.find(AuthLogoutView)).toHaveLength(1);
                done();
            }, 500);
        });

    it('passes username and logout() as props to AuthSuccessView', (done) => {
        const mockUsername = 'test username';

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthSuccess location={'mock'}/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthSuccess).instance().setState({redir: 0});
        component.find(AuthSuccess).instance().setState({username: mockUsername});
        component.update();

        setTimeout(function () {
            expect(component.find(AuthSuccessView).props().username)
                .toEqual(mockUsername);
            expect(component.find(AuthSuccessView).props().logout)
                .toEqual(component.find(AuthSuccess).instance().logout);
            done();
        }, 500);
    });

    it('invokes redux setUsername() on componentDidMount when props ' +
        'location state username is available', () => {
        const mockUsername = 'test username';
        const mockSetUsername = jest.fn();

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthSuccess location={{state: {username: mockUsername}}}
                        setUsername={mockSetUsername}/>
                </BrowserRouter>
            </Provider>
        );

        expect(mockSetUsername).toHaveBeenCalledWith(mockUsername);
    });

    it('logout() sends request to server and sets state value redir to logout ' +
        'when response is "logoutsuccess"', (done) => {
        const mock = new MockAdapter(axios);
        const resp = 'logoutsuccess';
        mock.onGet().reply(200, resp);

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthSuccess location={'mock'}/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthSuccess).instance().logout();
        component.update();

        setTimeout(function () {
            expect(component.find(AuthSuccess).state().redir).toEqual('logout');
            done();
        }, 500);
    });
});