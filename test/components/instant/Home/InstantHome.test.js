import React from 'react';
import store from '../../../../src/redux/store';
import InstantHome from "../../../../src/components/instant/Home/InstantHome";
import InstantLandingPageView from "../../../../src/components/instant/Home/views/InstantLandingPageView";
import InstantHomeRedirectView from "../../../../src/components/instant/Home/views/InstantHomeRedirectView";
import {Provider} from "react-redux";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import Loading from "../../../../src/components/LoadingComponent";
import {FormLogin} from "../../../../src/components/form/FormLogin";
import {FormRegister} from "../../../../src/components/form/FormRegister";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let open, send, status, onload, setRequestHeader, response;
function createXHRmock(error) {
    open = jest.fn();
    status = 200;
    response = JSON.stringify({score: 1.0, accuracy: 1.0});
    if (error) response = 'fail';

    send = jest.fn().mockImplementation(function() {
        onload = this.onload.bind(this);
    });

    const xhrMockClass = function () {
        return {
            open,
            send,
            status,
            setRequestHeader,
            response
        };
    };

    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
}

describe("InstantHome functional specification", () => {
    let component;
    let mock;

    beforeEach(() => {
        configure({adapter: new Adapter()});

        mock = new MockAdapter(axios);
        const resp = 'mock';
        mock.onGet('http://localhost:8081/auth/files')
            .reply(200, resp);
    });

    afterEach(() => {
        component.unmount();

        mock.restore();
    });

    it('renders InstantLandingPageView when state value redirect is false', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().setState({redirect: false});
        component.update();

        setTimeout(function () {
            expect(component.find(InstantLandingPageView)).toHaveLength(1);
            done();
        }, 500);
    });

    it('renders InstantHomeRedirectView when state values redirect is true and' +
        'error is false', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().setState({redirect: true});
        component.update();

        setTimeout(function () {
            expect(component.find(InstantHomeRedirectView)).toHaveLength(1);
            done();
        }, 500);
    });

    it('passes error msg prop to InstantLandingPageView when state value' +
        ' error is true', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().setState({error: true});
        component.update();

        setTimeout(function () {
            expect(component.find(InstantLandingPageView).props().errorMsg
                .props.children).toEqual('Error uploading file to server');
            done();
        }, 500);
    });

    it('passes loading component prop to InstantLandingPageView when ' +
        'state value loading is true', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().setState({loading: true});
        component.update();

        setTimeout(function () {
            expect(component.find(InstantLandingPageView).props().loadingComponent
                .props.children.type).toEqual(Loading);
            done();
        }, 500);
    });

    it('passes logout message prop to InstantLandingPageView when ' +
        'props location state value logout is not undefined', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome location={{state: {logout: true}}}/>
                </BrowserRouter>
            </Provider>
        );

        setTimeout(function () {
            expect(component.find(InstantLandingPageView).props().logoutMessage
                .props.children).toEqual('Successfully logged out');
            done();
        }, 500);
    });

    it('passes FormLogin prop to InstantLandingPageView when ' +
        'state value login is true', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().setState({login: true});
        component.update();

        setTimeout(function () {
            expect(component.find(InstantLandingPageView).props().formLogin
                .type).toEqual(FormLogin);
            done();
        }, 500);
    });

    it('passes FormRegister prop to InstantLandingPageView when ' +
        'state value register is true', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().setState({register: true});
        component.update();

        setTimeout(function () {
            expect(component.find(InstantLandingPageView).props().formRegister
                .type).toEqual(FormRegister);
            done();
        }, 500);
    });

    it('passes imagePreview prop to InstantLandingPageView when ' +
        'state value imagePreviewUrl is true', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().setState({imagePreviewUrl: 'abc'});
        component.update();

        setTimeout(function () {
            expect(component.find(InstantLandingPageView).props().imagePreview
                .props.children.type).toEqual('img');
            done();
        }, 500);
    });

    it('passes submitLoading, fileChangedHandler, doLogin, doRegister functions ' +
        'as props to InstantLandingPageView', () => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        expect(component.find(InstantLandingPageView).props().submitLoading)
            .toEqual(component.find(InstantHome).instance().submitLoading);
        expect(component.find(InstantLandingPageView).props().fileChangedHandler)
            .toEqual(component.find(InstantHome).instance().fileChangedHandler);
        expect(component.find(InstantLandingPageView).props().doLogin)
            .toEqual(component.find(InstantHome).instance().doLogin);
        expect(component.find(InstantLandingPageView).props().doRegister)
            .toEqual(component.find(InstantHome).instance().doRegister);
    });

    it('loading() sets state value loading to true', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().loading();
        component.update();

        setTimeout(function () {
            expect(component.find(InstantHome).state().loading).toEqual(true);
            done();
        }, 500);
    });

    it('submit() sends a POST request with state value selectedFile', (done) => {
        window.XMLHttpRequest.open = jest.fn();
        window.XMLHttpRequest.send = jest.fn();
        createXHRmock();

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );
        const fd = new FormData();
        fd.append('file', 'abc');

        component.find(InstantHome).instance().setState({selectedFile: 'abc'});
        component.find(InstantHome).instance().submit();
        component.update();

        setTimeout(function () {
            expect(open).toBeCalledWith('POST', 'http://localhost:8082/image', true);
            expect(send).toBeCalledWith(fd);
            done();
        }, 500);
    });

    it('submit() sets state values prediction to server response and ' +
        'redirect to true', (done) => {
        window.XMLHttpRequest.open = jest.fn();
        window.XMLHttpRequest.send = jest.fn();
        createXHRmock();

        const response = {score: 1.0, accuracy: 1.0};

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );
        const fd = new FormData();
        fd.append('file', 'abc');

        component.find(InstantHome).instance().setState({selectedFile: 'abc'});
        component.find(InstantHome).instance().submit();
        component.update();

        onload();

        setTimeout(function () {
            expect(component.find(InstantHome).state().prediction.score)
                .toEqual(response.score);
            expect(component.find(InstantHome).state().prediction.accuracy)
                .toEqual(response.accuracy);
            expect(component.find(InstantHome).state().redirect).toEqual(true);
            done();
        }, 500);
    });

    it('submit() invokes handleError() when response is not "success"', (done) => {
        window.XMLHttpRequest.open = jest.fn();
        window.XMLHttpRequest.send = jest.fn();
        createXHRmock(true);

        const handleError = jest.spyOn(InstantHome.prototype, 'handleError');

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );
        const fd = new FormData();
        fd.append('file', 'abc');

        component.find(InstantHome).instance().setState({selectedFile: 'abc'});
        component.find(InstantHome).instance().submit();
        component.update();

        onload();

        setTimeout(function () {
            expect(handleError).toHaveBeenCalled();
            done();
        }, 500);
    });

    it('handleError() sets state values error to true and loading to false',
        (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().setState({error: false});
        component.find(InstantHome).instance().setState({loading: true});
        component.update();

        component.find(InstantHome).instance().handleError();
        component.update();

        setTimeout(function () {
            expect(component.find(InstantHome).state().error).toEqual(true);
            expect(component.find(InstantHome).state().loading).toEqual(false);
            done();
        }, 500);
    });

    it('submitLoading() invokes submit() and loading()', (done) => {
        const submit = jest.spyOn(InstantHome.prototype, 'submit');
        const loading = jest.spyOn(InstantHome.prototype, 'loading');

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().submitLoading();
        component.update();

        setTimeout(function () {
            expect(submit).toHaveBeenCalled();
            expect(loading).toHaveBeenCalled();
            done();
        }, 500);
    });

    it('fileChangedHandler(event) sets state value selectedFile as ' +
        'event.target.files[0]', (done) => {
        jest.spyOn(global, "FileReader")
            .mockImplementation(function() {
                this.readAsDataURL = jest.fn();
            });
        const mockedEvent = {target: {files: [{size: 2000}]}};

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().fileChangedHandler(mockedEvent);
        component.update();

        setTimeout(function () {
            expect(component.find(InstantHome).state().selectedFile)
                .toEqual({size: 2000});
            done();
        }, 500);
    });

    it('setImagePreview(result) sets state value imagePreviewUrl as result',
        (done) => {
        const mockedResult = 'mocked banana jpeg';

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().setImagePreview(mockedResult);
        component.update();

        setTimeout(function () {
            expect(component.find(InstantHome).state().imagePreviewUrl)
                .toEqual(mockedResult);
            done();
        }, 500);
    });

    it('doLogin() sets state value register to false and toggles state value ' +
        'login', () => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().setState({login: false});
        component.find(InstantHome).instance().setState({register: true});
        component.find(InstantHome).instance().doLogin();
        component.update();
        expect(component.find(InstantHome).state().login).toEqual(true);
        expect(component.find(InstantHome).state().register).toEqual(false);

        component.find(InstantHome).instance().doLogin();
        component.update();
        expect(component.find(InstantHome).state().login).toEqual(false);
    });

    it('doRegister() sets state value login to false and toggles state value ' +
        'register', () => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(InstantHome).instance().setState({register: false});
        component.find(InstantHome).instance().setState({login: true});
        component.find(InstantHome).instance().doRegister();
        component.update();
        expect(component.find(InstantHome).state().register).toEqual(true);
        expect(component.find(InstantHome).state().login).toEqual(false);

        component.find(InstantHome).instance().doRegister();
        component.update();
        expect(component.find(InstantHome).state().register).toEqual(false);
    });
});