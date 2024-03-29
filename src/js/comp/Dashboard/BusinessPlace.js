import React, { Component } from 'react';
import AbstractDash from './AbstractDash';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { RatingUI } from '../Map/Rating';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import GasIcon from '@material-ui/icons/LocalGasStation';
import PhoneIcon from '@material-ui/icons/Phone';
import LandlineIcon from '@material-ui/icons/SettingsPhone';
import BroadbandIcon from '@material-ui/icons/LinearScale';
import FiberIcon from '@material-ui/icons/Timeline';
import ElectricIcon from '@material-ui/icons/OfflineBolt';
import MitIcon from '@material-ui/icons/MobileFriendly';
import TidIcon from '@material-ui/icons/Computer';
import ErrorIcon from '@material-ui/icons/Error';
import BusinessEdit from './BusinessEdit';
import IssueBox from '../InfoBox/IssueBox';


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
        this.state = {
            serviceData: null,
            serviceLoaded: false,
            editUI: false,
            errorUI: false,
            errorMsg: 'Something went wrong :('
        }
    }
    componentWillReceiveProps(newProps){
        if(newProps.data != null){
            console.log("Should be loading data ");
            console.log(newProps.data.id);
            
            
            this.loadServiceData(newProps.data.id);
        }
    }
    loadServiceData(id){
        (async() => {
            try{
                console.log("Fetching with api/business.php?type=services&id=" + id);
                
                const serviceReq = await fetch('api/business.php?type=services&id=' + id, {method: 'GET'});
                const serviceRes = await serviceReq.json();
                console.log("Service data is here:");
                console.log(serviceRes);
                
                
                if(serviceRes.data){
                    this.setState({
                        serviceData: serviceRes.data,
                        serviceLoaded: true
                    });
                }else{
                    console.log("%cJOSH'S PLACE: Error parsing service response");
                }

            }catch(e){
                console.log("%cJOSH'S PLACES: Error getting services data, error: " + e, 'color: red');   
            }
        })();
    }
    onFindOnMap(){
        // console.log("Pressed find on map");
        let data = {lat: this.props.data.latitude, long: this.props.data.longitude};
        console.log(data);
        this.props.panTo(data);
    }
    onEdit(){
        this.setState({
            editUI: true
        })
    }
    onCloseEdit(){
        this.setState({
            editUI: false
        })
    }
    onDelete(){
        (async() => {
            try{
                const deleteReq = await fetch('api/business.php', {
                    method: 'POST',
                    headers: {'Accept' : 'json/application' , 'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        type: 'delete',
                        table: 'businesses',
                        data: {id: this.props.data.id}
                    })
                });

                const deleteRes = await deleteReq.json();

                if(deleteRes.error){
                    this.setState({
                        errorUI: true,
                        errorMsg: deleteRes.error
                    })
                }else{
                    this.props.disableHandler(); // This should be a force update method 
                }
            }catch(e){
                this.setState({
                    errorUI: true,
                    errorMsg: e
                })
            }
        })();
    }
    closeError(){
        this.setState({
            errorUI: false,
            errorMsg: 'Something went wrong :('
        })
    }
    render(){
        return(
            <AbstractDash enabled={this.props.enabled} disableHandler={this.props.disableHandler.bind(this)}>
                {this.props.data ?
                    <div>
                        <Grid container style={{textAlign: 'center', padding: '20px'}}>
                            <Grid container>
                                <Grid item xs={12} style={{marginBottom: '-16px'}}> <h2> {this.props.data.name} </h2></Grid>
                                <Grid item xs={12}> {this.props.data.rating ? <RatingUI stars={this.props.data.rating} styleOpt={{color: 'black'}}/> : 'No Rating'}</Grid>
                            </Grid>
                            <Divider width="100%" style={{marginTop: '20px'}}/>
                            <div style={{padding: '30px 0'}}>
                                <Grid container spacing={32}>
                                    <Grid item xs={3} style={{textAlign: 'left'}}>Type: </Grid>
                                    <Grid item xs={9} style={{textAlign: 'right'}}> {this.props.data.businessType != null ? this.props.data.businessType : "N/A"} </Grid>
                                    <Grid item xs={3} style={{textAlign: 'left'}}>Address: </Grid>
                                    <Grid item xs={9} style={{textAlign: 'right'}}> {this.props.data.address != null ? this.props.data.address: "N/A"} </Grid>
                                    <Grid item xs={3} style={{textAlign: 'left'}}>Postcode: </Grid>
                                    <Grid item xs={9} style={{textAlign: 'right'}}> {this.props.data.postCode != null ? this.props.data.postCode : "N/A"}</Grid>
                                    <Grid item xs={6} style={{textAlign: 'left'}}>Mobile Number: </Grid>
                                    <Grid item xs={6} style={{textAlign: 'right'}}> {this.props.data.mobileNo != null ? formatPhoneNum(this.props.data.mobileNo) :  "N/A"} </Grid>
                                    <Grid item xs={3} style={{textAlign: 'left'}}>Landline: </Grid>
                                    <Grid item xs={9} style={{textAlign: 'right'}}> {this.props.data.landlineNo != null ? formatPhoneNum(this.props.data.landlineNo) : "N/A"}</Grid>
                                    <Grid item xs={12}><Button onClick={() => this.onFindOnMap()} variant="contained" style={{width: '100%', borderRadius: '0', color: 'white', boxShadow: 'none'}} color="secondary">Find On Map</Button></Grid>
                                </Grid>
                            </div>
                            {this.state.serviceLoaded ? 
                            <Grid item xs={12}>
                                <h3 style={{textAlign: 'center'}}>Registered Services</h3>
                                    <List>
                                        {this.state.serviceData.existing.map((e, i) => {
                                           return <ExistingItem key={i} data={e} />
                                        })}
                                        {this.state.serviceData.existing.length == 0 ? <h5 style={{color: 'rgb(175, 175, 175)'}}>No Existing Services</h5> : null}
                                    </List>
                                <h3 style={{textAlign: 'center'}}>Services you can Offer</h3>
                                    <List>
                                        {this.state.serviceData.services.map((e, i) => {
                                            return <ServicesItem key={i} data={e} />
                                            })}
                                    </List>
                            </Grid>                                
                                :
                                <div>
                                    <h4>Loading Service Data...</h4>
                                    <LinearProgress variant="indeterminate"/>
                                </div>
                                }
                                {this.props.admin == 1 ? 
                                    <Grid item container xs={12}>
                                        <h3 style={{textAlign: 'center'}}>Admin Options:</h3>
                                        <Grid item xs={12}><Button onClick={() => this.onEdit()} variant="contained" style={{width: '100%', borderRadius: '0', color: 'white', boxShadow: 'none', backgroundColor: '#00A86B', marginBottom: '10px'}}>Edit</Button></Grid>
                                        <Grid item xs={12}><Button onClick={() => this.onDelete()} variant="contained" style={{width: '100%', borderRadius: '0', color: 'white', boxShadow: 'none', backgroundColor: '#ED2939'}}>Delete</Button></Grid>
                                    </Grid>
                                    : null}
                            </Grid>
                    </div> 
                    : 
                    <LinearProgress variant="indeterminate" />
                    }
                    <IssueBox open={this.state.errorUI} callBack={this.closeError.bind(this)} errorString={this.state.errorMsg} buttonText="Ok"/>
                    <BusinessEdit enabled={this.state.editUI} disableHandler={this.onCloseEdit.bind(this)} data={this.props.data}/>
            </AbstractDash>
        );
    }
}


class IconMaker extends Component {
    constructor(props){
        super(props);
    }
    render(){
        switch(this.props.iconName){
            case "Gas":
            return <GasIcon />;
            case "Phone":
            return <PhoneIcon/>;
            case "Landline":
            return <LandlineIcon />;
            case "Broadband":
            return <BroadbandIcon />;
            case "Fiber":
            return <FiberIcon />;
            case "Electric":
            return <ElectricIcon />;
            case "MIT":
            return <MitIcon />;
            case "TID":
            return <TidIcon />;
            default: 
            return <ErrorIcon />;
        }
    }   
}


class ServicesItem extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Grow in={true}>
                <ListItem style={{padding: '10px 0', margin: '10px 0px', boxShadow: '1px 2px 1px rgb(40, 40, 40, 0.3)', borderBottom: 'solid #00a4c4 2px'}}>
                    <ListItemIcon style={{padding: '10px'}}><span><IconMaker iconName={this.props.data} /></span></ListItemIcon>
                    <ListItemText primary={this.props.data}/>
                </ListItem>
            </Grow>
        );
    }
}

class ExistingItem extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Grow in={true}>
                <ListItem button style={{padding: '10px 0', margin: '10px 0px', boxShadow: '1px 2px 1px rgb(40, 40, 40, 0.3)', borderBottom: 'solid #00a4c4 2px'}}>
                    <ListItemIcon style={{padding: '10px'}}><span><IconMaker iconName={this.props.data.product} /></span></ListItemIcon>
                    <ListItemText primary={this.props.data.product} secondary={'Contract Expiry: ' + this.props.data.contractEndDate}/>
                </ListItem>
            </Grow>
        );
    }
}
