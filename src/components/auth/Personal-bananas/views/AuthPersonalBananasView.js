import React, {Component} from "react";
import Gallery from "react-grid-gallery";
import {Link} from "react-router-dom";

class AuthPersonalBananasView extends Component {
    render() {
        let myGallery;
        if (this.props.shouldGalleryOpen) {
            myGallery = <Gallery images={this.props.IMAGES}
                customControls={[<button key="deleteImage" onClick={this.props.deleteImage}>Delete banana</button>]}
                currentImageWillChange={this.props.onCurrentImageChange}
            />
        } else myGallery = <div/>

        return (
            <div className="App">
                <div style={{
                    display: "block",
                    minHeight: "1px",
                    width: "100%",
                    overflow: "auto"}}>
                    {myGallery}
                </div>
                <div className="App-header">
                    <Link to="/success">
                        <button variant="outlined">
                            Back
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}
export default AuthPersonalBananasView;