import React, {Component} from "react";
import Gallery from "react-grid-gallery";
import {Link} from "react-router-dom";

class Personal_bananas extends Component {
    render() {
        return (
            <div className="App">
                <div style={{
                    display: "block",
                    minHeight: "1px",
                    width: "100%",
                    overflow: "auto"}}>
                    <Gallery images={this.props.IMAGES}
                             customControls={[<button key="deleteImage" onClick={this.props.deleteImage}>Delete banana</button>]}
                             currentImageWillChange={this.props.onCurrentImageChange}
                    />
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
export default Personal_bananas;