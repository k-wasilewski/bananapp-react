import React from 'react';
import Loading from '../../LoadingComponent';
import AuthLandingPageView from './views/AuthLandingPageView';
import AuthRedirectResultsView from './views/AuthRedirectResultsView';

class AuthHome extends React.Component {
    constructor(props) {
        super(props);

        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.submit_loading = this.submit_loading.bind(this)
    }

    state =  {
        selectedFile: null,
        imagePreviewUrl: null,
        prediction: null,
        redirect: false,
        loading: false,
        error: false
    };

    submit_loading = () => {
        this.loading();
        setTimeout( () => {
            this.submit();
        }, 500);
    }

    loading = () => {
        this.setState({loading: true});
    }

    submit = () => {
        if (this.state.selectedFile!==null) {
            var fd = new FormData();

            fd.append('file', this.state.selectedFile);

            var request = new XMLHttpRequest();

            var $this = this;
            request.onload = function() {
                if (request.response==0) {
                    $this.setState({
                        error: true,
                        loading: false
                    })
                } else {
                    $this.setState({
                        prediction: request.response,
                        redirect: true
                    });
                }
            }
            request.open('POST', `http://localhost:8082/auth/image?uname=${this.props.username}`, true);
            request.send(fd);
        } else {
            this.setState({
                error: true,
                loading: false
            })
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

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(event.target.files[0])

    }

    render() {
        let error_msg;
        if (this.state.error) {
            error_msg = (<div>Error uploading file to server</div>)
        } else error_msg = (<div/>);

        let $imagePreview = (<div className='previewText image-container'>Select a jpg image to add a banana</div>);
        if (this.state.imagePreviewUrl) {
            $imagePreview = (<div className='image-container' ><img src={this.state.imagePreviewUrl} alt='icon' width='200' /> </div>);
        }

        let loading_component;
        if (this.state.loading) {
            loading_component = (
                <div>
                    <Loading/>
                </div>
            )
        } else loading_component = (<div />);

        if (!this.state.redirect) return (
            <AuthLandingPageView fileChangedHandler={this.fileChangedHandler}
                                 submit_loading={this.submit_loading}
                                 loading_component={loading_component}
                                 error_msg={error_msg}
                                 $imagePreview={$imagePreview}/>
        );
        else return (
            <AuthRedirectResultsView prediction={this.state.prediction}
                                     img={this.state.imagePreviewUrl}
                                     username={this.props.username}/>
        )
    }
}

export default AuthHome;