import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMapReact from 'google-map-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PositionMarker, Marker } from './Marker';

export default class Map extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props){
        super(props);
        this.state = {
            center: {lat: 0, lng: 0},
            zoom: 15,
            loaded: false,
            mapLoaded: true,
            data: null,
            radius: null,
            map: null,
            maps: null
        }

        // console.log("Passed long and lat" + this.props.lat + this.props.long);
        

        this.googleMap = React.createRef();
    }
    componentWillReceiveProps(newProps){
        console.log("Can we get a radius of this:" + newProps.radius);
        
        this.setState({
            center: {lat: newProps.lat, lng: newProps.long},
            data: newProps.businessData,
            radius: newProps.radius
        }, () =>{
            this.setState({loaded: true}, ()=> {
                this.reRenderGoogleMap();
                this.forceUpdate();
            });
        });
    }
    changeOfMapDetails(values){
        console.log(values.zoom);
        
        this.setState({
            zoom: values.zoom
        }, () => {
            this.forceUpdate()
        });
    }
    setMapAPI(map, maps){
        this.setState({
            map: map,
            maps: maps
        }, () => {
            let radiusCircle = new maps.Circle({strokeColor: '#00a4c4', strokeOpacity: 0.8, strokeWeight: 2, fillColor: '#282828', fillOpacity: 0.02, map, center: this.state.center, radius: (1609.34 * this.state.radius)});
            radiusCircle.setMap(map);
            this.setState({
                radiusCircle: radiusCircle
            });
        });
    }
    reRenderGoogleMap(){
        if(this.state.radiusCircle){
            this.state.radiusCircle.setRadius((1609.34 * this.state.radius));
        }
    }
    render(){
        return(
            <div style={{width: '100vw', height: '102vh', overflowY: 'hidden'}}>

                {this.state.loaded == true ?
                <GoogleMapReact onChange={(e) => this.changeOfMapDetails(e)} ref={this.googleMap} bootstrapURLKeys={{ key : 'AIzaSyBSh_Mzr93v9bT4kD1I6doJ3D_GHwe8_2E'}} zoom={this.state.zoom} center={this.state.center} onGoogleApiLoaded={({map, maps}) => this.setMapAPI(map, maps)}>
                    <PositionMarker lat={this.state.center.lat} lng={this.state.center.lng}  />
                    {this.state.data.map((e, i) => {
                        return (<Marker lat={e.latitude} lng={e.longitude} data={e} key={i} rating={this.props.rating} zoom={this.state.zoom} onInfoTap={this.props.onInfoTap.bind(this)}/>);
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



