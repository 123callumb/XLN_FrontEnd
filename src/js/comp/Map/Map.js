import React, { Component } from 'react';

import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
    render(){
        return(
            <Map google={this.props.google} zoom={14} name="Current Loc">
                
            </Map>
        );
    }
}

export default GoogleApiWrapper({apiKey: 'blahaha'})(MapContainer);
