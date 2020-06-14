import React, {Component} from 'react';
import Gallery from 'react-grid-gallery';
import {Link} from 'react-router-dom';

class AuthPersonalBananasView extends Component {
    render() {
        const myGallery = (this.props.shouldGalleryOpen) ?
            (<Gallery images={this.props.IMAGES}
                     customControls={[<button key='deleteImage' onClick={this.props.deleteImage}>
                         Delete banana</button>]}
                     currentImageWillChange={this.props.onCurrentImageChange} />)
        :
        (<div/>);

        return (
            <div className='App'>
                <div className='galleryWrapper'>
                    {myGallery}
                </div>
                <div className='App-header'>
                    <Link to='/success'>
                        <button variant='outlined'>
                            Back
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}
export default AuthPersonalBananasView;