import React from 'react';
import store from '../../../../src/redux/store';
import {AuthPersonalBananas} from "../../../../src/components/auth/Personal-bananas/AuthPersonalBananas";
import AuthPersonalBananasView from "../../../../src/components/auth/Personal-bananas/views/AuthPersonalBananasView";
import {Provider} from "react-redux";
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {mount} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import GetDays from "../../../../src/func/GetDays";

describe("AuthPersonalBananas functional specification", () => {
    let component;
    let mock;
    let resp;
    let IMAGESpush;

    beforeEach(() => {
        configure({adapter: new Adapter()});

        mock = new MockAdapter(axios);
        resp = {score: 1.0, accuracy: 1.0};
        mock.onPost('http://localhost:8081/auth/imgpred')
            .reply(200, resp);

        jest.spyOn(AuthPersonalBananas.prototype, 'getFiles')
            .mockImplementation(() => {});
        IMAGESpush = jest.spyOn(AuthPersonalBananas.prototype, 'IMAGESpush')
            .mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();

        component.unmount();
    });

    it('renders AuthPersonalBananasView', () => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthPersonalBananas/>
                </BrowserRouter>
            </Provider>
        );

        expect(component.find(AuthPersonalBananasView)).toHaveLength(1);
    });

    it('passes IMAGES, onCurrentImageChange, deleteImage, shouldGalleryOpen ' +
        'as props to AuthPersonalBananasView', (done) => {
        const mockIMAGES = [{
            src: 'mock',
            thumbnail: 'mock',
            thumbnailWidth: 0,
            thumbnailHeight: 0,
            caption: 'mock',
            tags: [{value: 'mock', title: 'mock'}]
        }];
        const mockShouldGalleryOpen = 'mock';

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthPersonalBananas/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthPersonalBananas).instance().setState({
            IMAGES: mockIMAGES,
            shouldGalleryOpen: mockShouldGalleryOpen
        });
        component.update();

        setTimeout(function () {
            expect(component.find(AuthPersonalBananasView).props().IMAGES)
                .toEqual(mockIMAGES);
            expect(component.find(AuthPersonalBananasView).props().onCurrentImageChange)
                .toEqual(component.find(AuthPersonalBananas).instance().
                    onCurrentImageChange);
            expect(component.find(AuthPersonalBananasView).props().deleteImage)
                .toEqual(component.find(AuthPersonalBananas).instance()
                    .deleteImage);
            expect(component.find(AuthPersonalBananasView).props().shouldGalleryOpen)
                .toEqual(mockShouldGalleryOpen);
            done();
        }, 500);
    });

    it('getImgPred(img) sends request to server, sets state value prediction ' +
        'and invokes IMAGESpush()', (done) => {
        const mockImg = {filename: 'mock', link: 'mock'};

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthPersonalBananas/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthPersonalBananas).instance().getImgPred(mockImg);
        component.update();

        const accuracy = resp.accuracy;
        const days = GetDays(resp.score);
        const pred = days+' for '+Number((accuracy*100).toFixed(2)) +'%';

        setTimeout(function () {
            expect(component.find(AuthPersonalBananas).state().pred)
                .toEqual(pred);
            expect(IMAGESpush).toHaveBeenCalled();
            done();
        }, 500);
    });
});

describe("AuthPersonalBananas functional specification", () => {
    let component;
    let mock;
    let mockImgList;
    let resp;
    let getFiles;

    beforeEach(() => {
        configure({adapter: new Adapter()});

        mock = new MockAdapter(axios);
        resp = 'mock';
        mock.onGet('http://localhost:8081/auth/files')
            .reply(200, resp);

        mockImgList = jest.spyOn(AuthPersonalBananas.prototype, 'imgList')
            .mockImplementation(() => {})
        getFiles = jest.spyOn(AuthPersonalBananas.prototype, 'getFiles');
    });

    afterEach(() => {
        mock.restore();

        jest.restoreAllMocks();

        component.unmount();
    });

    it('invokes getFiles() on componentDidMount(), which sends request to ' +
        'server, sets state value images as response.data, ' +
        'invokes imgList()', (done) => {
        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthPersonalBananas/>
                </BrowserRouter>
            </Provider>
        );

        setTimeout(function () {
            expect(component.find(AuthPersonalBananas).state().images)
                .toEqual(resp);
            expect(mockImgList).toHaveBeenCalled();
            expect(getFiles).toHaveBeenCalled();
            mock.restore();
            done();
        }, 500);
    })
});

describe("AuthPersonalBananas functional specification", () => {
    let component;
    let getImgPred;
    let mock;
    let resp;

    beforeEach(() => {
        configure({adapter: new Adapter()});

        mock = new MockAdapter(axios);
        resp = 'mock';
        mock.onPost('http://localhost:8081/auth/del')
            .reply(200, resp);

        jest.spyOn(AuthPersonalBananas.prototype, 'getFiles')
            .mockImplementation(() => {});
        getImgPred = jest.spyOn(AuthPersonalBananas.prototype, 'getImgPred')
            .mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();

        mock.restore();

        component.unmount();
    });

    it('IMAGESpush(path) pushes new Gallery image to state value IMAGES',
        (done) => {
        const mockPath = 'mock';
        const mockPred = 'mock';
        const mockIMAGE = {
            src: `${mockPath}`,
            thumbnail: `${mockPath}`,
            caption: mockPred,
            tags: [{value: mockPred, title: mockPred}]
        };

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthPersonalBananas/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthPersonalBananas).instance().setState({
            pred: mockPred
        })
        component.find(AuthPersonalBananas).instance().IMAGESpush(mockPath);
        component.update();

        setTimeout(function () {
            expect(component.find(AuthPersonalBananasView).props().IMAGES)
                .toEqual([mockIMAGE]);
            done();
        }, 500);
    });

    it('imgList() invokes getImgPred(img) for each img in state value images',
        (done) => {
        let mockImages = [];
        const mockImg1 = JSON.stringify({img: 1});
        const mockImg2 = JSON.stringify({img: 2});
        mockImages.push(mockImg1);
        mockImages.push(mockImg2);

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthPersonalBananas/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthPersonalBananas).instance().setState({
            images: mockImages
        })
        component.find(AuthPersonalBananas).instance().imgList();
        component.update();

        setTimeout(function () {
            expect(getImgPred).toHaveBeenCalledWith({img: 1});
            expect(getImgPred).toHaveBeenCalledWith({img: 2});
            done();
        }, 500);
    });

    it('deleteImage() deletes state value currentImage from state value ' +
        'IMAGES and sends request to server', (done) => {
        global.confirm = () => true;

        let mockImages = [];
        const mockImg1 = JSON.stringify({img: 1});
        const mockImg2 = JSON.stringify({img: 2});
        mockImages.push(mockImg1);
        mockImages.push(mockImg2);

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthPersonalBananas username='mock'/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthPersonalBananas).instance().setState({
            images: mockImages,
            IMAGES: mockImages,
            currentImage: 1
        })
        component.find(AuthPersonalBananas).instance().deleteImage();
        component.update();

        setTimeout(function () {
            expect(component.find(AuthPersonalBananas).state().IMAGES)
                .toEqual([mockImg1]);
            done();
        }, 500);
    });

    it('onCurrentImageChange(index) sets state value currentImage as index'
        , (done) => {
        const mockIndex = 'mock';

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <AuthPersonalBananas username='mock'/>
                </BrowserRouter>
            </Provider>
        );

        component.find(AuthPersonalBananas).instance().onCurrentImageChange(mockIndex);
        component.update();

        setTimeout(function () {
            expect(component.find(AuthPersonalBananas).state().currentImage)
                .toEqual(mockIndex);
            done();
        }, 500);
    });
});