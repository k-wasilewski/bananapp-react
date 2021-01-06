import React from 'react';
import store from '../../../../src/redux/store';
import {AuthHome} from "../../../../src/components/auth/Home/AuthHome";
import AuthHomeView from "../../../../src/components/auth/Home/views/AuthHomeView";
import {Provider} from "react-redux";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import Loading from "../../../../src/components/LoadingComponent";

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

describe("AuthHome functional specification", () => {
    let component;
    const error = console.error;

    beforeEach(() => {
        configure({adapter: new Adapter()});
    });

    afterEach(() => {
        component.unmount();
    });

    beforeAll(() => {//suppress Network Error in AuthPersonalBananas
        console.error = jest.fn();
    });

    afterAll(() => {
        console.error = error;
    });

    it('renders AuthHomeView when state value redirect is false', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthHome).instance().setState({redirect: false});
        component.update();

        setTimeout(function () {
            expect(component.find(AuthHomeView)).toHaveLength(1);
            done();
        }, 500);
    });

    it('renders AuthHomeView when state value redirect is true',
        (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthHome).instance().setState({redirect: true});
        component.update();

        setTimeout(function () {
            expect(component.find(AuthHomeView)).toHaveLength(1);
            done();
        }, 500);
    });

    it('passes error msg prop to AuthHomeView when state value' +
        ' error is true', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthHome).instance().setState({error: true});
        component.update();

        setTimeout(function () {
            expect(component.find(AuthHomeView).props().errorMsg
                .props.children).toEqual('Error uploading file to server');
            done();
        }, 500);
    });

    it('passes loading component prop to AuthHomeView when ' +
        'state value loading is true', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthHome).instance().setState({loading: true});
        component.update();

        setTimeout(function () {
            expect(component.find(AuthHomeView).props().loadingComponent.type)
                .toEqual(Loading);
            done();
        }, 500);
    });

    it('passes imagePreview prop to AuthHomeView when ' +
        'state value imagePreviewUrl is true', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthHome).instance().setState({imagePreviewUrl: 'abc'});
        component.update();

        setTimeout(function () {
            expect(component.find(AuthHomeView).props().$imagePreview
                .props.children.type).toEqual('img');
            done();
        }, 500);
    });

    it('passes submitLoading, fileChangedHandler functions ' +
        'as props to AuthHomeView', () => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );

        expect(component.find(AuthHomeView).props().submitLoading)
            .toEqual(component.find(AuthHome).instance().submitLoading);
        expect(component.find(AuthHomeView).props().fileChangedHandler)
            .toEqual(component.find(AuthHome).instance().fileChangedHandler);
    });

    it('passes prediction, img props to AuthHomeView',
        (done) => {
        const mockPrediction = 'mock prediction';
        const mockImg = 'mock img';
        const mockUsername = 'mock username';

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHome />
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthHome).instance().setState({prediction: mockPrediction});
        component.find(AuthHome).instance().setState({imagePreviewUrl: mockImg});
        component.find(AuthHome).instance().setState({redirect: true});
        component.update();

        setTimeout(function () {
            expect(component.find(AuthHomeView).props().prediction)
                .toEqual(mockPrediction);
            expect(component.find(AuthHomeView).props().img)
                .toEqual(mockImg);
            done();
        }, 500);
    });

    it('loading() sets state value loading to true', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthHome).instance().loading();
        component.update();

        setTimeout(function () {
            expect(component.find(AuthHome).state().loading).toEqual(true);
            done();
        }, 500);
    });

    it('submit() sends a POST request with state value selectedFile', (done) => {
        window.XMLHttpRequest.open = jest.fn();
        window.XMLHttpRequest.send = jest.fn();
        createXHRmock();

        let username;

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );
        const fd = new FormData();
        fd.append('file', 'abc');

        component.find(AuthHome).instance().setState({selectedFile: 'abc'});
        component.find(AuthHome).instance().submit();
        component.update();

        setTimeout(function () {
            expect(open).toBeCalledWith('POST', 'http://localhost:8082/auth/image?' +
                'uname='+username, true);
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
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );
        const fd = new FormData();
        fd.append('file', 'abc');

        component.find(AuthHome).instance().setState({selectedFile: 'abc'});
        component.find(AuthHome).instance().submit();
        component.update();

        onload();

        setTimeout(function () {
            expect(component.find(AuthHome).state().prediction.score)
                .toEqual(response.score);
            expect(component.find(AuthHome).state().prediction.accuracy)
                .toEqual(response.accuracy);
            expect(component.find(AuthHome).state().redirect).toEqual(true);
            done();
        }, 500);
    });

    it('submit() invokes handleError() when response is not "success"', (done) => {
        window.XMLHttpRequest.open = jest.fn();
        window.XMLHttpRequest.send = jest.fn();
        createXHRmock(true);

        const handleError = jest.spyOn(AuthHome.prototype, 'handleError');

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );
        const fd = new FormData();
        fd.append('file', 'abc');

        component.find(AuthHome).instance().setState({selectedFile: 'abc'});
        component.find(AuthHome).instance().submit();
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
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthHome).instance().setState({error: false});
        component.find(AuthHome).instance().setState({loading: true});
        component.update();

        component.find(AuthHome).instance().handleError();
        component.update();

        setTimeout(function () {
            expect(component.find(AuthHome).state().error).toEqual(true);
            expect(component.find(AuthHome).state().loading).toEqual(false);
            done();
        }, 500);
    });

    it('submitLoading() invokes submit() and loading()', (done) => {
        const submit = jest.spyOn(AuthHome.prototype, 'submit');
        const loading = jest.spyOn(AuthHome.prototype, 'loading');

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthHome).instance().submitLoading();
        component.update();

        setTimeout(function () {
            expect(submit).toHaveBeenCalled();
            expect(loading).toHaveBeenCalled();
            done();
        }, 500);
    });

    it('fileChangedHandler(event) sets state value selectedFile as ' +
        'event.target.files[0] if event.target.files[0].size<=1024*1024', (done) => {
        jest.spyOn(global, "FileReader")
            .mockImplementation(function() {
                this.readAsDataURL = jest.fn();
            });
        const mockedEvent = {target: {files: [{size: 2000}]}};
        const mockedEventError = {target: {files: [{size: 2000*2000}]}};

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthHome).instance().fileChangedHandler(mockedEvent);
        component.update();

        setTimeout(function () {
            expect(component.find(AuthHome).state().selectedFile)
                .toEqual({size: 2000});

            component.find(AuthHome).instance().fileChangedHandler(mockedEventError);
            component.update();
            setTimeout(function () {
                expect(component.find(AuthHome).state().selectedFile)
                    .toEqual(null);

                done();
            }, 500);
        }, 500);
    });

    it('setImagePreview(result) sets state value imagePreviewUrl as result',
        (done) => {
        const mockedResult = 'mocked banana jpeg';

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthHome/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthHome).instance().setImagePreview(mockedResult);
        component.update();

        setTimeout(function () {
            expect(component.find(AuthHome).state().imagePreviewUrl)
                .toEqual(mockedResult);
            done();
        }, 500);
    });
});