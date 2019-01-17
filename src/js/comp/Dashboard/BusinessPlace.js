import React, { Component } from 'react';
import AbstractDash from './AbstractDash';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { PositionMarker, CleanMarker } from '../Map/Marker';
import { RatingUI } from '../Map/Rating';

import GoogleMapReact from 'google-map-react';

function formatPhoneNum(orgnum) {
    var temp = orgnum.toString();
    var area = temp.substring(0, 4);
    var withspace = area.concat(" ");
    var num = temp.substring(5,10);
    return (withspace.concat(num));
}

export default class BusinessPlace extends Component {
    constructor(props){
        super(props);
    }



    render(){
        return(
            <AbstractDash enabled={this.props.enabled} disableHandler={this.props.disableHandler.bind(this)}>
                {this.props.data ?
                    <div>
                        {/* <div style={{width: '100vw', height: '30vh', zIndex: '110'}}>
                             <GoogleMapReact yesIWantToUseGoogleMapApiInternals={true} bootstrapURLKeys={{ key : 'AIzaSyBSh_Mzr93v9bT4kD1I6doJ3D_GHwe8_2E'}} zoom={10} center={{lng: this.props.long, lat: this.props.lat}}>
                                <PositionMarker lat={this.props.lat} lng={this.props.long}  />
                                <CleanMarker lat={this.props.data.latitude} lng={this.props.data.longitude}/>
                            </GoogleMapReact>  
                        </div> */}
                        <Grid container style={{textAlign: 'center'}}>
                            <Grid container>
                                <Grid item xs={12} style={{marginBottom: '-16px'}}> <h2> {this.props.data.name} </h2></Grid>
                                <Grid item xs={12}> {this.props.data.rating ? <RatingUI stars={this.props.data.rating} styleOpt={{color: 'black'}}/> : 'No Rating'}</Grid>
                            </Grid>
                            <Divider width="100%" style={{marginTop: '20px' }}/>
                            <div style={{padding: '30px'}}>
                                <Grid container>
                                    <Grid item xs={3} style={{textAlign: 'left'}}>Type: </Grid>
                                    <Grid item xs={9} style={{textAlign: 'right'}}> {this.props.data.buisnessType ? this.props.data.buisnessType : "N/A"} </Grid>
                                    <Grid item xs={3} style={{textAlign: 'left'}}>Address: </Grid>
                                    <Grid item xs={9} style={{textAlign: 'right'}}> {this.props.data.address ? this.props.data.address: "N/A"} </Grid>
                                    <Grid item xs={3} style={{textAlign: 'left'}}>Postcode: </Grid>
                                    <Grid item xs={9} style={{textAlign: 'right'}}> {this.props.data.postCode ? this.props.data.postCode : "N/A"}</Grid>
                                    <Grid item xs={6} style={{textAlign: 'left'}}>Mobile Number: </Grid>
                                    <Grid item xs={6} style={{textAlign: 'right'}}> {this.props.data.mobileNo ? formatPhoneNum(this.props.data.mobileNo) :  "N/A"} </Grid>
                                    <Grid item xs={3} style={{textAlign: 'left'}}>Landline: </Grid>
                                    <Grid item xs={9} style={{textAlign: 'right'}}> {this.props.data.landlineNo ? formatPhoneNum(this.props.data.landlineNo) : "N/A"}</Grid>
                                    <Grid item xs={12} style={{padding:'20px'}}> <h3>Servcies</h3></Grid>
                                </Grid>
                                <Grid item xs={12}><Button variant="contained" style={{width: '100%', borderRadius: '0', color: 'white', boxShadow: 'none'}} color="secondary">Find On Map &gt;&gt;</Button></Grid>
                            </div>
                        </Grid>
                    </div> 
                    : 
                    <LinearProgress variant="indeterminate" />
                    }
            </AbstractDash>
        );
    }
}