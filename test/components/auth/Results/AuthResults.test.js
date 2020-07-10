import React from 'react';
import store from '../../../../src/redux/store';
import {AuthResults} from "../../../../src/components/auth/Results/AuthResults";
import AuthResultsView from "../../../../src/components/auth/Results/views/AuthResultsView";
import {Provider} from "react-redux";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import GetDays from "../../../../src/func/GetDays";

describe("AuthResults functional specification", () => {
    let component;
    let mock;
    const resp = 'ok';

    beforeEach(() => {
        configure({adapter: new Adapter()});

        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();

        component.unmount();
    });

    it('renders AuthResultsView when props location state is undefined', () => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthResults location={'mock'}/>
                </BrowserRouter>
            </Provider>
        );

        expect(component.find(AuthResultsView)).toHaveLength(1);
    });

    it('renders AuthResultsView when props location state prediction is correct',
        () => {
        mock.onPost().reply(200, resp);

        const mockPrediction = {score: 1.0, accuracy: 1.0};
        const mockImg = 'mock img';

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthResults location={{state: {prediction: mockPrediction,
                            img: mockImg}}}/>
                </BrowserRouter>
            </Provider>
        );

            expect(component.find(AuthResultsView)).toHaveLength(1);
    });

    it('passes props location state prediction and img as props to ' +
        'AuthResultsView', () => {
        mock.onPost().reply(200, resp);

        const mockPrediction = {score: 1.0, accuracy: 1.0};
        const mockImg = 'mock img';

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthResults location={{state: {prediction: mockPrediction,
                        img: mockImg}}}/>
                </BrowserRouter>
            </Provider>
        );

        expect(component.find(AuthResultsView).props().img)
            .toEqual(mockImg);
        expect(component.find(AuthResultsView).props().days)
            .toEqual(GetDays(mockPrediction.score));
        expect(component.find(AuthResultsView).props().accuracy)
            .toEqual(mockPrediction.accuracy);
    });

    it('invokes saveimg(score, acc, filename, username, pic_link) when ' +
        'AuthResultsView is rendered', () => {
        mock.onPost().reply(200, resp);

        const mockUsername = 'test username';
        const mockPrediction = {score: 1.0, accuracy: 1.0, filename: 'mock.jpg'};
        const mockImg = 'mock img';
        const saveimg = jest.spyOn(AuthResults.prototype, 'saveimg');

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthResults location={{state: {prediction: mockPrediction,
                            img: mockImg}}} username={mockUsername}/>
                </BrowserRouter>
            </Provider>
        );

        const score = mockPrediction.score;
        const accuracy = mockPrediction.accuracy;
        const filename = mockPrediction.filename;
        const username = mockUsername;
        const img = mockImg;

        expect(saveimg)
            .toHaveBeenCalledWith(score, accuracy, filename, username, img);
    });

    it('saveimg() sends request with its arguments to server', (done) => {
        const mockPrediction = {score: 1.0, accuracy: 1.0, filename: 'mock.jpg'};
        const mockImg = 'mock img';
        const mockUsername = 'mock username';

        const score = mockPrediction.score;
        const accuracy = mockPrediction.accuracy;
        const filename = mockPrediction.filename;
        const username = mockUsername;
        const img = mockImg;

        mock.onPost('http://localhost:8081/auth/saveimg',
            `filename=${filename}&score=${score}&acc=${accuracy}
            &uname=${username}&link=${img.split('+').join('plussign')}`)
            .reply(200, resp);

        const consoleError = jest.spyOn(console, 'error');

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthResults location={{state: {prediction: mockPrediction,
                            img: mockImg}}} username={mockUsername}/>
                </BrowserRouter>
            </Provider>
        );

        setTimeout(function () {
            expect(consoleError).not.toHaveBeenCalled();
            done();
        }, 500);
    });
});