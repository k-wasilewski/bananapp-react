import React from 'react';
import axios from "axios";
import Personal_bananas from "./views/Personal_bananas";

class Auth_personalBananas extends React.Component {

    constructor(){
        super();
        this.state = {
            username: 0,
            images: 0,
            pred: 0,
            IMAGES: [],
            currentImage: 0
        }
        this.imgList = this.imgList.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
    }

    componentDidMount() {
        let $this = this;

        axios.get('http://localhost:8081/auth/username')
            .then((response) => {
                let uname = response.data;
                this.setState({
                    username: uname
                });
            })

        axios.get('http://localhost:8081/auth/files')
            .then((response) => {
                let imgs = response.data;
                this.setState({
                        images: imgs
                    },
                    function() { $this.imgList() }
                );
            })
    }

    getImgPred = (path) => {
        var username = this.state.username;
        var $this = this;

        let regexFilename = new RegExp('^(.*?),,,');

        let filename = regexFilename.exec(path);

        let regexUrl = new RegExp(',,,(.*?)$');

        let url = regexUrl.exec(path);


        axios.post('http://localhost:8081/auth/imgpred',
            "filename=" + filename[1] + "&" +
                "username=" + username
        ).then(function (response) {
            if (response.status === 200) {
                const prediction = response.data;

                const scoreRegex = /score:(.*?),/;
                const accRegex = /acc:(0\.\d\d)/;

                const score = scoreRegex.exec(prediction);
                const accuracy = accRegex.exec(prediction);

                var days = '[error]';

                switch(true) {
                    case score[1]==1.0:
                        days="1 day";
                        break;
                    case score[1]==2.0:
                        days="2 days";
                        break;
                    case score[1]==3.0:
                        days="3 days";
                        break;
                    case score[1]==4.0:
                        days="4 days";
                        break;
                    case score[1]==5.0:
                        days="5 days";
                        break;
                    case score[1]==6.0:
                        days="6 days";
                        break;
                    case score[1]==7.0:
                        days="7 days";
                        break;
                }

                $this.setState({
                    pred: days+" for "+Number((accuracy[1]*100).toFixed(2)) +"%"
                }, function() { $this.IMAGESpush(url[1]) } );
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
        var $this = this;
        const IMAGES = [];
        const imgpaths = this.state.images;

        for (let i = 0; i < imgpaths.length; i++) {
            var path = imgpaths[i]
            this.getImgPred(path);
        }
    };

    deleteImage() {
        var $this = this;
        var username = this.state.username;

        if (window.confirm(`Are you sure you want to delete banana number ${this.state.currentImage}?`)) {
            const filenameRegex = /\/(.*?).jpg/;
            const filename = filenameRegex.exec(this.state.images[this.state.currentImage]);

            axios.post('http://localhost:8081/auth/del',
                "filename=" + filename + "&" +
                "username=" + username
            );

            var images = this.state.IMAGES.slice();
            images.splice(this.state.currentImage, 1)
            this.setState({
                IMAGES: images
            });
        }
    }

    onCurrentImageChange(index) {
        this.setState({ currentImage: index });
    }

    render() {

        return (
            <Personal_bananas deleteImage={this.deleteImage}
                            onCurrentImageChange={this.onCurrentImageChange}
                            IMAGES={this.state.IMAGES}/>
        )
    }
}

export default Auth_personalBananas;