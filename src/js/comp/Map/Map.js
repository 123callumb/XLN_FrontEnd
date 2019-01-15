import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMapReact from 'google-map-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PositionMarker, Marker } from './Marker';

const exampleDataArray = [
    {
        name: 'Magical Business of Shoes',
        contact: 'magicshoes@gmail.com',
        lead: false,
        type: 'Fashion Store',
        long: -1.47265,
        lat: 53.36612,
        rating: 6
    },
    {
        name: 'Sheffield Hallam University',
        contact: '0923294920',
        lead: true,
        type: 'University',
        long: -1.466250,
        lat: 53.379092,
        rating: 1
    },
    {
        name: 'Bramhall Stadium',
        contact: 'sheffieldUnited@football.co.uk',
        lead: true,
        type: 'Sports Stadium',
        long: -1.470942,
        lat: 53.370289,
        rating: 9
    }
];

export default class Map extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props){
        super(props);
        this.state = {
            center: {lat: 0, lng: 0},
            zoom: 15,
            loaded: false
        }
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((pos)=> {
            
            this.setState({center: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                },
                loaded: true
            });
            
        }, (err) => {
            console.log(err); 
        }, {timeout: 10000});
    }
    render(){
        return(
            <div style={{width: '100vw', height: '102vh', overflowY: 'hidden'}}>
                {this.state.loaded == true ?
                <GoogleMapReact bootstrapURLKeys={{ key : 'AIzaSyBSh_Mzr93v9bT4kD1I6doJ3D_GHwe8_2E'}} zoom={this.state.zoom} center={this.state.center}>
                    <PositionMarker lat={this.state.center.lat} lng={this.state.center.lng}  />
                    {exampleDataArray.map((e, i) => {
                        return (<Marker lat={e.lat} lng={e.long} data={e} key={i}/>);
                    })}
                </GoogleMapReact>
                : 
                <div style={{margin: '45vh auto', textAlign: 'center'}}>
                    <CircularProgress color="secondary"/>
                </div>}
            </div>
        );
    }
}



