import React from 'react';
import axios from 'axios';
import AuthPersonalBananasView from './views/AuthPersonalBananasView';
import {setUsername} from '../../../redux/actions';
import {connect} from 'react-redux';
import GetDays from "../../../func/GetDays";

export class AuthPersonalBananas extends React.Component {

    constructor(){
        super();
        this.state = {
            images: 0,
            pred: 0,
            IMAGES: [],
            currentImage: 0,

            shouldGalleryOpen: true
        };

        this.imgList = this.imgList.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
    }

    componentDidMount() {
        this.getFiles();
    }

    getFiles() {
        const $this = this;

        axios.get('http://localhost:8081/auth/files',
            {withCredentials: true})
            .then((response) => {
                this.setState({
                        images: response.data
                    },
                    function() { $this.imgList() }
                );
            });
    }

    getImgPred(img) {
        const $this = this;
        const username = this.props.username;

        const filename = img.filename;
        const url = img.link;

        axios.post('http://localhost:8081/auth/imgpred',
            `filename=${filename}&username=${username}`,
            {withCredentials: true}
        ).then(function (response) {
            if (response.status === 200) {
                const prediction = response.data;
                const score = prediction.score;

                if (score!==undefined) {
                    const days = GetDays(score);
                    const accuracy = prediction.accuracy;

                    if (accuracy!==undefined) {
                        $this.setState({
                            pred: days+' for '+Number((accuracy*100).toFixed(2)) +'%'
                        }, function() { $this.IMAGESpush(url) } );
                    }
                }
            }
        });
    }

    IMAGESpush(path) {
        const $this = this;

        const newIMAGE = {
            src: `${path}`,
            thumbnail: `${path}`,
            caption: $this.state.pred,
            tags: [{value: $this.state.pred, title: $this.state.pred}]
        };
        this.setState({IMAGES: this.state.IMAGES.concat(newIMAGE)});
    }

    imgList() {
        const imgs = this.state.images;

        for (let i = 0; i < imgs.length; i++) {
            const img = JSON.parse(imgs[i]);
            this.getImgPred(img);
        }
    };

    deleteImage() {
        const username = this.props.username;

        if (window.confirm(`Are you sure you want to delete banana number ${this.state.currentImage+1}?`)) {
            const filename = JSON.parse(this.state.images[this.state.currentImage]).filename;

            axios.post('http://localhost:8081/auth/del',
                `filename=${filename}&username=${username}`,
                {withCredentials: true}
            );

            let images = this.state.IMAGES.slice();
            images.splice(this.state.currentImage, 1);
            this.setState({
                IMAGES: images,
                currentImage: 0
            }, () => {
                if (this.state.IMAGES.length===0) {
                    this.setState({
                        shouldGalleryOpen: false
                    })
                }
            });
        }
    }

    onCurrentImageChange(index) {
        this.setState({ currentImage: index });
    }

    render() {
        return (
            <AuthPersonalBananasView shouldGalleryOpen = {this.state.shouldGalleryOpen}
                                     deleteImage={this.deleteImage}
                                     onCurrentImageChange={this.onCurrentImageChange}
                                     IMAGES={this.state.IMAGES}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.setUsernameReducer.username
    };
};

const mapDispatchToProps = {
    setUsername
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPersonalBananas);