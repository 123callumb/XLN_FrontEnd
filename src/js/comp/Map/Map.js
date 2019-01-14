import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';

export default class Map extends Component {
    constructor(){
        super();
        this.state = {
            center: {lat: 59.95, lng: 30.33},
            zoom: 11
        }
    }
    render(){
        return(
            <div style={{width: '100vw', height: '100vh'}}>
                <GoogleMapReact bootstrapURLKeys={'AIzaSyBSh_Mzr93v9bT4kD1I6doJ3D_GHwe8_2E'} zoom={this.state.zoom} center={this.state.center}/>
            </div>
        );
    }
}


