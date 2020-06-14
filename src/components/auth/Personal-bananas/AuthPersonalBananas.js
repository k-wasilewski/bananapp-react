import React from 'react';
import axios from 'axios';
import AuthPersonalBananasView from './views/AuthPersonalBananasView';
import {setUsername} from '../../../redux/actions';
import {connect} from 'react-redux';
import GetDaysAndAcc from "../../../func/GetDaysAndAcc";

class AuthPersonalBananas extends React.Component {

    constructor(){
        super();
        this.state = {
            username: 0,
            images: 0,
            pred: 0,
            IMAGES: [],
            currentImage: 0,

            shouldGalleryOpen: true
        }
        this.imgList = this.imgList.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
    }

    componentDidMount() {
        let $this = this;

        axios.get('http://localhost:8081/auth/files',
            {withCredentials: true})
            .then((response) => {
                let imgs = response.data
                this.setState({
                        images: imgs
                    },
                    function() { $this.imgList() }
                );
            })
    }

    getImgPred = (path) => {
        var $this = this;
        var username = this.props.username;

        let regexFilename = new RegExp('^(.*?),,,');
        let filename = regexFilename.exec(path);
        let regexUrl = new RegExp(',,,(.*?)$');
        let url = regexUrl.exec(path);

        axios.post('http://localhost:8081/auth/imgpred',
            `filename=${filename[1]}&username=${username}`,
            {withCredentials: true}
        ).then(function (response) {
            if (response.status === 200) {
                const prediction = response.data;
                const scoreRegex = /score:(.*?),/;
                const score = scoreRegex.exec(prediction);

                if (score!==null) {
                    const daysAndAcc = GetDaysAndAcc(prediction);
                    const days = daysAndAcc[0];
                    const accuracy = daysAndAcc[1];

                    if (accuracy!==null) {
                        $this.setState({
                            pred: days+' for '+Number((accuracy*100).toFixed(2)) +'%'
                        }, function() { $this.IMAGESpush(url[1]) } );
                    }
                }
            }
        });
    }

    IMAGESpush = (path) => {
        var $this = this;

        const newIMAGE = {
            src: `${path}`,
            thumbnail: `${path}`,
            caption: $this.state.pred,
            tags: [{value: $this.state.pred, title: $this.state.pred}]
        };
        this.setState({IMAGES: this.state.IMAGES.concat(newIMAGE)});
    }

    imgList = () => {
        const imgpaths = this.state.images;

        for (let i = 0; i < imgpaths.length; i++) {
            var path = imgpaths[i]
            this.getImgPred(path);
        }
    };

    deleteImage() {
        var username = this.props.username;

        if (window.confirm(`Are you sure you want to delete banana number ${this.state.currentImage+1}?`)) {
            let filenameRegex =
                (this.state.images[this.state.currentImage].includes('jpg')) ?
                /(.*?).jpg/
                :
                /(.*?).jpeg/;
            const filename = filenameRegex.exec(this.state.images[this.state.currentImage]);

            axios.post('http://localhost:8081/auth/del',
                `filename=${filename[0]}&username=${username}`,
                {withCredentials: true}
            );

            var images = this.state.IMAGES.slice();
            images.splice(this.state.currentImage, 1)
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
        )
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