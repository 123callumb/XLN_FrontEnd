import React, { Component } from 'react';

import AbstractDash from './AbstractDash';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import FilterIcon from '@material-ui/icons/FilterList';
import BusinessPlace from './BusinessPlace';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import VerifiedIcon from '@material-ui/icons/HowToReg';
import NotVerIcon from '@material-ui/icons/AccountCircleRounded';



export default class BusinessDash extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            lat: null, // These two are needed for the search function.
            lng: null,
            viewBusiness: false,
            currentBusiness: null,
            tempSearchData: null,
            isSearching: false
        }  
    }
    componentWillReceiveProps(newProps){
        this.setState({
            data: newProps.businessData,
            lat: newProps.lat,
            long: newProps.long
        });
    }
    closeBusiness(){
        this.setState({viewBusiness: false});
    }
    setBusiness(data){
        this.setState({currentBusiness: data}, () => {
            this.setState({viewBusiness: true});
        });
    }
    fetchSearchData(val){
        if(val != '' || val != null || val != ' '){
            (async() => {
                const searchReq = await fetch('api/business.php?type=search&query=' + val, {
                    method: 'GET'
                });

                const searchRes = await searchReq.json();

                if(searchRes.data){
                    this.setState({isSearching: true, tempSearchData: searchRes.data});
                }else{
                    this.setState({isSearching: false, tempSearchData: null});
                }

            })();
        }else{
            this.setState({isSearching: false, tempSearchData: null});
        }
    }
    render(){
        return(
            <AbstractDash enabled={this.props.enabled} disableHandler={this.props.disableHandler.bind(this)}>
                <div style={{textAlign: 'center', marginBottom: '30px'}}>
                    <h2>Businesses</h2>
                    <Grid container>
                        <Grid item xs={2} md={2}><span><SearchIcon style={{marginTop: '5%'}}/></span></Grid>
                        <Grid item xs={8} md={8}><TextField placeholder="Search Business Name/Type" style={{width: '100%'}} onChange={(e) => this.fetchSearchData(e.target.value)}/></Grid>
                        <Grid item xs={2} md={2}><span><FilterIcon style={{marginTop: '5%'}}/></span></Grid>
                    </Grid>
                </div>
                <List>
                    <ListItem style={{padding: '5px 0'}}>
                        <ListItemIcon><b>Lead</b></ListItemIcon>
                        <ListItemText primary={<b>Name:</b>} />
                        <ListItemSecondaryAction><b>Dist. (Miles)</b></ListItemSecondaryAction>
                    </ListItem>
                    {this.state.isSearching == true ? 
                        this.state.tempSearchData ? 
                            this.state.tempSearchData.map( (e, i) => {
                                return <BusinessItem placeData={e} key={i} setBusiness={this.setBusiness.bind(this)}/>
                            })
                            :
                            <LinearProgress color="secondary" variant="indeterminate" />
                    :
                        this.state.data ? 
                            this.state.data.map((e, i) => {
                                return <BusinessItem placeData={e} key={i} setBusiness={this.setBusiness.bind(this)}/> 
                            })
                            :
                            <LinearProgress color="secondary" variant="indeterminate" />
                    }
                    
                </List>
                <BusinessPlace enabled={this.state.viewBusiness} disableHandler={this.closeBusiness.bind(this)} data={this.state.currentBusiness}/>
            </AbstractDash>
        );
    }
}


class BusinessItem extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Grow in={true}>
                <ListItem button onClick={() => this.props.setBusiness(this.props.placeData)} style={{padding: '10px 0', margin: '10px 0px', boxShadow: '1px 2px 1px rgb(40, 40, 40, 0.3)', borderBottom: this.props.placeData.hasActiveLead ? 'solid #00a4c4 2px' : 'none'}}>
                    <ListItemIcon style={{padding: '10px'}}>{this.props.placeData.hasActiveLead ? <span><VerifiedIcon /></span> : <span><NotVerIcon /></span>}</ListItemIcon>
                    <ListItemText 
                        style={{maxWidth: '75%', paddingLeft: '10px'}}
                        primary={this.props.placeData.name}
                        secondary={this.props.placeData.businessType}
                    />
                   {this.props.placeData.distance ? <ListItemSecondaryAction style={{paddingRight: '10px'}}>{this.props.placeData.distance.toFixed(2)}</ListItemSecondaryAction> : null }
                </ListItem>
            </Grow>
        );
    }
}