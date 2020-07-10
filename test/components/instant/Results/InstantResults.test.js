import React from 'react';
import store from '../../../../src/redux/store';
import {Provider} from "react-redux";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import GetDays from "../../../../src/func/GetDays";
import InstantResults from "../../../../src/components/instant/Results/InstantResults";
import InstantResultsView from "../../../../src/components/instant/Results/views/InstantResultsView";

describe("InstantResults functional specification", () => {
    let component;

    beforeEach(() => {
        configure({adapter: new Adapter()});
    });

    afterEach(() => {
        component.unmount();
    });

    it('renders InstantResultsErrorView when props location state prediction ' +
        'value is undefined', () => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantResults location='incorrect value'/>
                </BrowserRouter>
            </Provider>
        );

        expect(component.find(InstantResultsView)).toHaveLength(1);
    });

    it('renders InstantResultsView when props location state prediction ' +
        'value is correct', () => {
        const correctPrediction = {score: 1.0, accuracy: 1.0};

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantResults location={{state: {prediction: correctPrediction}}}/>
                </BrowserRouter>
            </Provider>
        );

        expect(component.find(InstantResultsView)).toHaveLength(1);
    });

    it('passes img prop to InstantResultsView when props location state ' +
        'img is not undefined', () => {
        const correctPrediction = {score: 1.0, accuracy: 1.0};
        const mockImg = 'img';

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantResults location={{state: {prediction: correctPrediction,
                        img: mockImg}}}/>
                </BrowserRouter>
            </Provider>
        );

        expect(component.find(InstantResultsView).props().img).toEqual(mockImg);
    });

    it('passes days prop to InstantResultsView when ' +
        'props location state prediction score is between 1 and 7', () => {
        const correctPrediction = {score: 1.0, accuracy: 1.0};
        const days = GetDays(correctPrediction.score);

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantResults location={{state: {prediction: correctPrediction}}}/>
                </BrowserRouter>
            </Provider>
        );

        expect(component.find(InstantResultsView).props().days).toEqual(days);
    });

    it('passes accuracy prop to InstantResultsView when ' +
        'props location state prediction accuracy is not undefined', () => {
        const correctPrediction = {score: 1.0, accuracy: 1.0};

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <InstantResults location={{state: {prediction: correctPrediction}}}/>
                </BrowserRouter>
            </Provider>
        );

        expect(component.find(InstantResultsView).props().accuracy)
            .toEqual(correctPrediction.accuracy);
    });
});