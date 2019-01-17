import React, { Component } from 'react';
import AbstractDash from './AbstractDash';
import LinearProgress from '@material-ui/core/LinearProgress';
import { PositionMarker, CleanMarker } from '../Map/Marker';

import GoogleMapReact from 'google-map-react';

export default class BusinessPlace extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <AbstractDash enabled={this.props.enabled} disableHandler={this.props.disableHandler.bind(this)}>
                {this.props.data ?
                    <div>
                        <div style={{width: '100vw', height: '30vh', zIndex: '110'}}>
                            <GoogleMapReact yesIWantToUseGoogleMapApiInternals={true} bootstrapURLKeys={{ key : 'AIzaSyBSh_Mzr93v9bT4kD1I6doJ3D_GHwe8_2E'}} zoom={10} center={{lng: this.props.long, lat: this.props.lat}}>
                                <PositionMarker lat={this.props.lat} lng={this.props.long}  />
                                <CleanMarker lat={this.props.data.latitude} lng={this.props.data.longitude}/>
                            </GoogleMapReact> 
                        </div>
                        <h4>{this.props.data.name}</h4>
                    </div> 
                    : 
                    <LinearProgress variant="indeterminate" />
                    }
            </AbstractDash>
        );
    }
}