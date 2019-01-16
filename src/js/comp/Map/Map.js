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
            loaded: false,
            mapLoaded: true,
            data: null
        }

        this.googleMap = React.createRef();
    }
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((pos)=> {
            
            this.setState({center: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                }}, () => {

                    // Now we fetch the business data:
                    (async() => {
                        try{
                            const dataReq = await fetch('api/business.php?longitude=' + this.state.lng + '&latitude=' + this.state.lat + '&radius=1&type=map', {
                                method: 'GET'
                            });
                            const dataRes = await dataReq.json();

                            console.log(dataRes);
                            if(dataRes.data != null){
                                this.setState({loaded: true, data: dataRes.data});
                            }else{
                                console.log("Error parsing data result or data result is null :(");
                            }
                            
                        }catch(e){
                            console.log("Error loading business data " + e);
                            
                        }
                    })();

                });
            
        }, (err) => {
            console.log("Could not get your location!"); 
            console.log(err); 
        }, {timeout: 10000});
    }
    changeOfMapDetails(values){
        console.log(values.zoom);
        
        this.setState({
            zoom: values.zoom
        }, () => {
            this.forceUpdate()
        });
    }
    render(){
        return(
            <div style={{width: '100vw', height: '102vh', overflowY: 'hidden'}}>
                {this.state.loaded == true ?
                <GoogleMapReact onChange={(e) => this.changeOfMapDetails(e)} ref={this.googleMap} bootstrapURLKeys={{ key : 'AIzaSyBSh_Mzr93v9bT4kD1I6doJ3D_GHwe8_2E'}} zoom={this.state.zoom} center={this.state.center}>
                    <PositionMarker lat={this.state.center.lat} lng={this.state.center.lng}  />
                    {this.state.data.map((e, i) => {
                        return (<Marker lat={e.latitude} lng={e.longitude} data={e} key={i} rating={this.props.rating} zoom={this.state.zoom}/>);
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



