import React, {Component} from 'react';

class AuthLandingPageView extends Component {
    render() {
        return (
            <div>
                <header>
                    <input type='file' name='avatar' onChange={this.props.fileChangedHandler} />
                    <button type='button' onClick={this.props.submitLoading} > Upload </button>
                    { this.props.loadingComponent }
                    { this.props.errorMsg }
                    { this.props.$imagePreview }
                </header>
            </div>
        );
    }
}
export default AuthLandingPageView;