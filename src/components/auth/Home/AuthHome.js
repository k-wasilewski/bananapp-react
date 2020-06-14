import React from 'react';
import Loading from '../../LoadingComponent';
import AuthLandingPageView from './views/AuthLandingPageView';
import AuthRedirectResultsView from './views/AuthRedirectResultsView';

class AuthHome extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {
            selectedFile: null,
            imagePreviewUrl: null,
            prediction: null,
            redirect: false,
            loading: false,
            error: false
        };

        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.submitLoading = this.submitLoading.bind(this)
    }

    submitLoading = () => {
        this.loading();
        setTimeout( () => {
            this.submit();
        }, 500);
    }

    loading = () => {
        this.setState({loading: true});
    }

    handleError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }

    submit = () => {
        const $this = this;

        if (this.state.selectedFile!==null) {
            const fd = new FormData();
            const request = new XMLHttpRequest();

            fd.append('file', this.state.selectedFile);
            request.onload = function() {
                const response = request.response.trim();

                if (response==0 || response=='fail') {
                    $this.handleError();
                } else {
                    $this.setState({
                        prediction: JSON.parse(response),
                        redirect: true
                    });
                }
            }
            request.open('POST',
                `http://localhost:8082/auth/image?uname=${this.props.username}`, true);
            request.send(fd);
        } else {
            this.handleError();
        }
    }

    fileChangedHandler = event => {
        if (event.target.files[0].size>1024*1024) {
            this.setState({
                selectedFile: null
            })
        } else {
            this.setState({
                selectedFile: event.target.files[0]
            })
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(event.target.files[0])
    }

    render() {
        const errorMsg = this.state.error ? (<div>Error uploading file to server</div>) : (<div/>);

        const $imagePreview = this.state.imagePreviewUrl ?
            (<div className='image-container' >
                <img src={this.state.imagePreviewUrl} alt='icon' width='200' />
            </div>)
                :
            (<div className='previewText image-container'>
                Select a jpg image (max filesize 1 MB) to add a banana
            </div>);

        const loadingComponent = (this.state.loading) ? (
            <div>
                <Loading/>
            </div>
        )
        :
        (<div />);

        if (!this.state.redirect) {
            return (
                <AuthLandingPageView fileChangedHandler={this.fileChangedHandler}
                                     submitLoading={this.submitLoading}
                                     loadingComponent={loadingComponent}
                                     errorMsg={errorMsg}
                                     $imagePreview={$imagePreview}/>
            );
        } else {
            return (
                <AuthRedirectResultsView prediction={this.state.prediction}
                                         img={this.state.imagePreviewUrl}
                                         username={this.props.username}/>
            );
        }
    }
}

export default AuthHome;