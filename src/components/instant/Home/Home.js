import React, {Component} from 'react';
import '../../../css/App.css';
import {Form_register} from "../../form/Form_register";
import {Form_login} from "../../form/Form_login";
import Loading from "../../Loading-component";
import Landing_page from "./views/Landing-page";
import Home_redirect from "./views/Home_redirect";

class Home extends Component {
    constructor(props) {
        super(props)

        this.do_register = this.do_register.bind(this)
        this.do_login = this.do_login.bind(this)
        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.submit_loading = this.submit_loading.bind(this)
    }

    state =  {
        selectedFile: null,
        imagePreviewUrl: null,
        prediction: null,
        redirect: false,
        register: false,
        login: false,
        loading: false,
        error: false
    };

    do_register = () => {
        if (!this.state.register) this.setState({register: true})
        else this.setState({register: false})
    }

    do_login = () => {
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

    submit_loading = () => {
        this.loading();
        setTimeout( () => {
            this.submit();
        }, 500);
    }

    submit = () => {
        if (this.state.selectedFile!=null) {
            var fd = new FormData();

            fd.append('file', this.state.selectedFile);

            var request = new XMLHttpRequest();

            var $this = this;
            request.onload = function() {
                $this.setState({
                    prediction: request.response,
                    redirect: true
                });
            }
            request.open("POST", "http://localhost:8082/image", true);
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
        let imagePreview = (<div className="previewText image-container">Select a jpg image (max filesize 1 MB) to check your banana</div>);
        if (this.state.imagePreviewUrl) {
            imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" /> </div>);
        }

        let form_register;
        if ( this.state.register ) {
            form_register = (
                <div>
                    <Form_register />
                </div>
            )
        } else form_register = (<div />)

        let form_login;
        if ( this.state.login ) {
            form_login = (<Form_login/>)
        } else form_login = (<div />)

        let logout_message = (<div />);
        if ( this.props.location.state !== undefined) {
            if ( this.props.location.state.logout !== undefined ) {
                logout_message = (<div>Successfully logged out</div>)
            }
        }

        let loading_component;
        if (this.state.loading) {
            loading_component = (
                <div>
                    <Loading/>
                </div>
            )
        } else loading_component = (<div />);

        let error_msg;
        if (this.state.error) {
            error_msg = (<div>File is too big</div>)
        } else error_msg = (<div/>);


        if (!this.state.redirect) return (
            <Landing_page do_register={this.do_register}
                          do_login={this.do_login}
                          fileChangedHandler={this.fileChangedHandler}
                          submit_loading={this.submit_loading}
                          logout_message={logout_message}
                          form_register={form_register}
                          form_login={form_login}
                          loading_component={loading_component}
                          error_msg={error_msg}
                          image_preview={imagePreview}/>
        );
        else if (this.state.redirect || !this.state.error) {
            return (
                <Home_redirect prediction={this.state.prediction}
                               img={this.state.imagePreviewUrl}/>
            )
        }
    }
}

export default Home;