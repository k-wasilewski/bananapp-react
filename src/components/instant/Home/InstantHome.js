import React, {Component} from 'react';
import '../../../css/App.css';
import {FormRegister} from '../../form/FormRegister';
import {FormLogin} from '../../form/FormLogin';
import Loading from '../../LoadingComponent';
import InstantLandingPageView from './views/InstantLandingPageView';
import InstantHomeRedirectView from './views/InstantHomeRedirectView';

class InstantHome extends Component {
    constructor(props) {
        super(props);

        this.state =  {
            selectedFile: null,
            imagePreviewUrl: null,
            prediction: null,
            redirect: false,
            register: false,
            login: false,
            loading: false,
            error: false
        };

        this.doRegister = this.doRegister.bind(this);
        this.doLogin = this.doLogin.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.submitLoading = this.submitLoading.bind(this);
    }

    doRegister = () => {
        if (!this.state.register) {
            this.setState({
                register: true,
                login: false
            });
        }
        else this.setState({register: false});
    }

    doLogin = () => {
        if (!this.state.login) {
            this.setState({
                login: true,
                register: false
            });
        }
        else this.setState({login: false});
    }

    fileChangedHandler = event => {
        if (event.target.files[0].size>1024*1024) {
            this.setState({
                selectedFile: null
            });
        } else {
            this.setState({
                selectedFile: event.target.files[0]
            });
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(event.target.files[0]);
    }

    submitLoading = () => {
        this.loading();
        setTimeout( () => {
            this.submit();
        }, 500);
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

            fd.append('file', this.state.selectedFile);

            const request = new XMLHttpRequest();

            request.onload = function() {
                const response = request.response.trim();

                if (response===0 || response==='fail') {
                    $this.handleError();
                } else {
                    $this.setState({
                        prediction: JSON.parse(response),
                        redirect: true
                    });
                }
            }
            request.open('POST', 'http://localhost:8082/image', true);
            request.send(fd);
        } else {
            this.handleError();
        }
    }

    loading = () => {
        this.setState({loading: true});
    }

    render() {
        const imagePreview = (!this.state.imagePreviewUrl) ?
            (<div className='previewText image-container'>
                    Select a jpg image (max filesize 1 MB) to check your banana
                </div>)
            :
            (<div className='image-container' >
                    <img src={this.state.imagePreviewUrl} alt='icon' width='200' />
                </div>);

        const formRegister = ( this.state.register ) ?
            (<div>
                    <FormRegister />
                </div>)
            :
            (<div />);

        const formLogin = ( this.state.login ) ? (<FormLogin/>) : (<div />);

        const logoutMessage = ( this.props.location.state !== undefined &&
            this.props.location.state.logout !== undefined ) ?
                (<div>Successfully logged out</div>) : (<div />);

        const loadingComponent = (this.state.loading) ?
            (<div>
                    <Loading/>
                </div>)
            : (<div />);

        const errorMsg = (this.state.error) ?
            (<div>Error uploading file to server</div>) : (<div/>);

        if (!this.state.redirect) {
            return (
                <InstantLandingPageView doRegister={this.doRegister}
                                        doLogin={this.doLogin}
                                        fileChangedHandler={this.fileChangedHandler}
                                        submitLoading={this.submitLoading}
                                        logoutMessage={logoutMessage}
                                        formRegister={formRegister}
                                        formLogin={formLogin}
                                        loadingComponent={loadingComponent}
                                        errorMsg={errorMsg}
                                        imagePreview={imagePreview}/>
            );
        } else if (this.state.redirect || !this.state.error) {
            return (
                <InstantHomeRedirectView prediction={this.state.prediction}
                                         img={this.state.imagePreviewUrl}/>
            );
        }
    }
}

export default InstantHome;