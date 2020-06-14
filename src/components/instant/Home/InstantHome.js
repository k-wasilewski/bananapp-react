import React, {Component} from 'react';
import '../../../css/App.css';
import {FormRegister} from '../../form/FormRegister';
import {FormLogin} from '../../form/FormLogin';
import Loading from '../../LoadingComponent';
import InstantLandingPageView from './views/InstantLandingPageView';
import InstantHomeRedirectView from './views/InstantHomeRedirectView';

class InstantHome extends Component {
    constructor(props) {
        super(props)

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

        this.doRegister = this.doRegister.bind(this)
        this.doLogin = this.doLogin.bind(this)
        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.submitLoading = this.submitLoading.bind(this)
    }

    doRegister = () => {
        if (!this.state.register) this.setState({register: true})
        else this.setState({register: false})
    }

    doLogin = () => {
        if (!this.state.login) this.setState({login: true})
        else this.setState({login: false})
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

    submitLoading = () => {
        this.loading();
        setTimeout( () => {
            this.submit();
        }, 500);
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
            request.open('POST', 'http://localhost:8082/image', true);
            request.send(fd);
        } else {
            this.setState({
                error: true,
                loading: false
            })
        }
    }

    loading = () => {
        this.setState({loading: true});
    }

    render() {
        let imagePreview = (!this.state.imagePreviewUrl) ?
            (
                <div className='previewText image-container'>
                    Select a jpg image (max filesize 1 MB) to check your banana
                </div>
            ) : (
                <div className='image-container' >
                    <img src={this.state.imagePreviewUrl} alt='icon' width='200' />
                </div>
            );

        let formRegister = ( this.state.register ) ? (
                <div>
                    <FormRegister />
                </div>
            ) : (
                <div />
                );

        let formLogin = ( this.state.login ) ? (<FormLogin/>) : (<div />);

        let logoutMessage = ( this.props.location.state !== undefined &&
            this.props.location.state.logout !== undefined ) ?
                (<div>Successfully logged out</div>) : (<div />);

        let loadingComponent = (this.state.loading) ? (
                <div>
                    <Loading/>
                </div>
            )
            :
            (<div />);

        let errorMsg = (this.state.error) ? (<div>Error uploading file to server</div>) : (<div/>);

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
            )
        }
    }
}

export default InstantHome;