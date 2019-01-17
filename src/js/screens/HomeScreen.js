import React, { Component } from 'react';
import NavBar from '../comp/NavBar/NavBar';
import Snackbar from '@material-ui/core/Snackbar';

import Map from '../comp/Map/Map';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfoBox from '../comp/InfoBox/InfoBox';
import SearchBox from '../comp/Search/SearchBox';
import IssueBox from '../comp/InfoBox/IssueBox';

const exampleDataArray = [
    {
        name: 'Magical Business of Shoes',
        contact: 'magicshoes@gmail.com',
        lead: false,
        businessType: 'Fashion Store',
        longitude: -1.47265,
        latitude: 53.36612,
        rating: 6,
        postCode: 'S2 4TG',
        hasActiveLead: 0
    },
    {
        name: 'Sheffield Hallam University',
        contact: '0923294920',
        lead: true,
        businessType: 'University',
        longitude: -1.466250,
        latitude: 53.379092,
        rating: 1,
        postCode: 'S2 4TG',
        hasActiveLead: 1
    },
    {
        name: 'Bramhall Stadium',
        contact: 'sheffieldUnited@football.co.uk',
        lead: true,
        businessType: 'Sports Stadium',
        longitude: -1.470942,
        latitude: 53.370289,
        rating: 9,
        postCode: 'S2 4TG',
        hasActiveLead: 0
    }
];

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            welcomeSnack: false,
            rate: false,
            long: null,
            lat: null,
            loaded: false,
            businessData: null,
            infoBox: false,
            infoBoxData: null,
            error: false,
            radius: 3
        }
    }
    componentDidMount(){
        this.setState({welcomeSnack: true}, () => {
            this.loadData();
        });
    }
    loadData(){
                // we're getting the position long and lat from homescreen now cos that probs best
                navigator.geolocation.getCurrentPosition((pos)=> {
            
                    this.setState({
                        lat: pos.coords.latitude,
                        long: pos.coords.longitude,
                        }, () => {
                            console.log("%cHOMEPAGES: We have the got long and lat!", "color: green");
                            
                            // Now we fetch the business data:
                            (async() => {
                                try{
                                    console.log('%cSENDING REQUEST: api/business.php?longitude=' + this.state.long + '&latitude=' + this.state.lat + '&radius=' + this.state.radius + '&type=map', "color: blue");
                                    
                                    const dataReq = await fetch('api/business.php?longitude=' + this.state.long + '&latitude=' + this.state.lat + '&radius=5&type=map', {
                                        method: 'GET'
                                    });
                                    const dataRes = await dataReq.json();
        
                                    console.log(dataRes);
                                    if(dataRes.data != null){
                                        console.log("%cHOMEPAGES: Loaded business data", "color: green");
                                        this.setState({businessData: dataRes.data});
                                    }else{
                                        console.log("%cHOMEPAGES: Error parsing data result or data result is null :( \n Going to examples data...", "color: red");
                                        this.setState({businessData: exampleDataArray}); 
                                    }
                                                
                                }catch(e){
                                    console.log("%cHOMEPAGES: Error loading business data " + e, "color: red");
                                    console.log("%cHOMEPAGES: Going to example data and hoping that the lat and long has loaded.", "color: red");
                                    this.setState({businessData: exampleDataArray});        
                                }
                            })();
                            
                        });
                    
                }, (err) => {
                    console.log("%cHOMEPAGES: Could not get your location! Error: " + err, "color: red"); 
                    this.setState({error: true});
                }, {timeout: 10000});
    }
    toggleRating(val){
        console.log("Received change of " + val);
        this.setState({
            rate: val
        }, () => this.forceUpdate());
    }
    onInfoTap(retData){
        this.setState({
            infoBox: true,
            infoBoxData: retData
        },() =>{
            this.forceUpdate();
        });
    }
    closeInfoBox(){
        this.setState({
            infoBox: false
        }, () => {
            this.forceUpdate();
        });
    }
    errorHandler(){
        this.setState({error: false}, () => {
            this.loadData()
        });
    }
    updateRadius(val){
        this.setState({radius: val}, () => {
            this.loadData();
            this.forceUpdate();
        });
    }
    render(){
        return(
            <div>
                <NavBar loggedIn={true} toggleRating={this.toggleRating.bind(this)} rating={this.state.rate} radius={this.state.radius} long={this.state.long} lat={this.state.lat} businessData={this.state.businessData} updateRadius={this.updateRadius.bind(this)}/>
                <SearchBox />
                <Snackbar ContentProps={{style: {backgroundColor: 'rgb(40, 40, 40)'}}} autoHideDuration={4000} open={this.state.welcomeSnack} onClose={() => this.setState({welcomeSnack: false})} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} message={<span>Welcome back {this.props.userData.firstName}</span>} />
                <InfoBox enabled={this.state.infoBox} data={this.state.infoBoxData} closeHandler={this.closeInfoBox.bind(this)}/>
                {this.state.businessData ? <Map radius={this.state.radius} rating={this.state.rate} businessData={this.state.businessData} long={this.state.long} lat={this.state.lat} onInfoTap={this.onInfoTap.bind(this)}/> : <CircularProgress color="secondary"/>}
                <IssueBox open={this.state.error} callBack={this.errorHandler.bind(this)} errorString="Could not load local business data."/>
            </div>
        );
    }
}