import React, { Component } from 'react';
import NavBar from '../comp/NavBar/NavBar';
import Snackbar from '@material-ui/core/Snackbar';

import Map from '../comp/Map/Map';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfoBox from '../comp/InfoBox/InfoBox';
import SearchBox from '../comp/Search/SearchBox';
import IssueBox from '../comp/InfoBox/IssueBox';
import BusinessPlace from '../comp/Dashboard/BusinessPlace';

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
            rate: true,
            long: null,
            lat: null,
            loaded: false,
            businessData: null,
            infoBox: false,
            infoBoxData: null,
            error: false,
            radius: 3,
            panData: null,
            quickInfo: false,
            quickInfoData: null
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
                                    
                                    const dataReq = await fetch('api/business.php?longitude=' + this.state.long + '&latitude=' + this.state.lat + '&radius=' + this.state.radius + '&type=map', {
                                        method: 'GET'
                                    });
                                    const dataRes = await dataReq.json();
        
                                    console.log(dataRes);
                                    if(dataRes.data != null){
                                        console.log("%cHOMEPAGES: Loaded business data", "color: green");
                                        this.setState({businessData: dataRes.data}, () => {
                                            this.forceUpdate();
                                        });
                                    }else{
                                        console.log("%cHOMEPAGES: Error parsing data result or data result is null :( \n Going to examples data...", "color: red");
                                        this.setState({businessData: exampleDataArray}, () => {
                                            this.forceUpdate();
                                        }); 
                                    }
                                                
                                }catch(e){
                                    console.log("%cHOMEPAGES: Error loading business data " + e, "color: red");
                                    console.log("%cHOMEPAGES: Going to example data and hoping that the lat and long has loaded.", "color: red");
                                    this.setState({businessData: exampleDataArray});        
                                }
                            })();
                            
                        });
                    
                }, (err) => {
                    console.log("%cHOMEPAGES: Could not get your location! Error: ", "color: red"); 
                    console.log(err);
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
    getSearchCallBack(data){
        this.onInfoTap(data);
        this.setState({
            panData: {long: data.longitude, lat: data.latitude}
        }, () => {
            this.forceUpdate();
            this.setState({
                panData: null
            }); 
        })
    }
    closeQuickInfo(){
        this.setState({
            quickInfo: false,
            quickInfoData: null
        });
    }
    activateFillInfo(data){
        this.setState({
            quickInfo: true,
            quickInfoData: data
        });
    }
    panTo(data){
            this.setState({
                quickInfo: false,
                quickInfoData: null,
            }, () => {
                this.setState({panData: data}, ()=> {
                    this.setState({panData: null}, () => {
                        this.forceUpdate();
                    });
                })
            }); 
        console.log("Why on earth do we always crash here? data is " + data.lat + data.long);
        
    }
    render(){
        return(
            <div>
                <NavBar loggedIn={true} toggleRating={this.toggleRating.bind(this)} rating={this.state.rate} radius={this.state.radius} long={this.state.long} lat={this.state.lat} businessData={this.state.businessData} updateRadius={this.updateRadius.bind(this)} admin={this.props.userData.admin} panTo={this.panTo.bind(this)}/>
                <SearchBox long={this.state.long} lat={this.state.lat} searchCallback={this.getSearchCallBack.bind(this)}/>
                <Snackbar ContentProps={{style: {backgroundColor: 'rgb(40, 40, 40)'}}} autoHideDuration={4000} open={this.state.welcomeSnack} onClose={() => this.setState({welcomeSnack: false})} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} message={<span>Welcome back {this.props.userData.firstName}</span>} />
                <InfoBox enabled={this.state.infoBox} data={this.state.infoBoxData} closeHandler={this.closeInfoBox.bind(this)} onMoreInfo={this.activateFillInfo.bind(this)}/>
                {this.state.businessData ? <Map radius={this.state.radius} rating={this.state.rate} businessData={this.state.businessData} long={this.state.long} lat={this.state.lat} onInfoTap={this.onInfoTap.bind(this)} panData={this.state.panData}/> : <CircularProgress color="secondary"/>}
                <IssueBox open={this.state.error} callBack={this.errorHandler.bind(this)} buttonText="Try Again" errorString="Could not load local business data. Make sure you are connected to the internet and have allowed the app to access your location."/>
                <BusinessPlace enabled={this.state.quickInfo} data={this.state.quickInfoData} disableHandler={this.closeQuickInfo.bind(this)} panTo={this.panTo.bind(this)} admin={this.props.userData.admin}/>
            </div>
        );
    }
}