import React, { Component } from 'react';

import AbstractDash from './AbstractDash';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IssueBox from '../InfoBox/IssueBox';

export default class BusinessAdder extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            businessType: '',
            address: '',
            postCode: '',
            rating: 10,
            existingCustomer: false,
            latitude: '',
            longitude: '',
            sicCode: '',
            sicDescription: '',
            hasFibre: false,
            isFibreAvailable: false,
            hasActiveLead: false,
            isCancelPending: false,
            landlineNo: '',
            mobileNo: '',
            interested: false,
            errorMsg: 'Please make sure all fields are filled in!',
            errorUI: false
        }
    }
    closeError(){
        this.setState({errorUI: false, errorMsg: 'Please make sure all fields are filled in!'}); //I set that back to normal just incase ;)
    }
    submitData(){
        (async() => {

            try{
                const sendData = await fetch('api/business.php', {
                    method: 'POST',
                    headers: {'Accept' : 'application/json' , 'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        type: 'update',
                        table: 'businesses',
                        data: this.state
                    })
                });
    
                const response = await sendData.json();

                console.log(response);
                
                if(!response.error){
                    console.log(response);
                    this.props.disableHandler();
                }else{
                    this.setState({
                        errorMsg: response.error,
                        errorUI: true
                    });
                }

            }catch(e){
                console.log("Insert business data Error " + e);
                this.setState({errorMsg: e, errorUI: true});
            }

        })();
    }
    render(){
        return(
            <AbstractDash enabled={this.props.enabled} disableHandler={this.props.disableHandler.bind(this)}>
                <h3 style={{textAlign: 'center'}}>Add New Business</h3>
                <Grid container style={{width: '100vw', padding: '20px'}} spacing={24}>
                    <Grid item xs={12}><TextField label="Business Name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} style={{width: '100%'}}/></Grid>
                    <Grid item xs={12}><TextField label="Business Type" value={this.state.businessType} onChange={(e) => this.setState({businessType: e.target.value})} style={{width: '100%'}}/></Grid>
                    <Grid item xs={12}><TextField label="Address" value={this.state.address} onChange={(e) => this.setState({address: e.target.value})} style={{width: '100%'}}/></Grid>
                    <Grid item xs={12}><TextField label="Postcode" value={this.state.postCode} onChange={(e) => this.setState({postCode: e.target.value})} style={{width: '100%'}}/></Grid>
                    <Grid item xs={12}><TextField label="Rating (1-10)" type="number" max="10" min="1" value={this.state.rating} onChange={(e) => this.setState({rating: e.target.value})} style={{width: '100%'}}/></Grid>
                    <Grid item xs={12}><FormControlLabel label="Existing Customer?" control={<Switch checked={this.state.existingCustomer} onChange={(e) => this.setState({existingCustomer: e.target.checked})}/>}  /></Grid>
                    <Grid item xs={12}><TextField label="Latitude" type="number" step="0.00000001" value={this.state.latitude} onChange={(e) => this.setState({latitude: e.target.value})} style={{width: '100%'}}/></Grid>
                    <Grid item xs={12}><TextField label="Longitude" type="number" step="0.00000001" value={this.state.longitude} onChange={(e) => this.setState({longitude: e.target.value})} style={{width: '100%'}}/></Grid>
                    <Grid item xs={12}><TextField label="SIC Code" type="number" value={this.state.sicCode} onChange={(e) => this.setState({sicCode: e.target.value})} style={{width: '100%'}}/></Grid>
                    <Grid item xs={12}><TextField label="SIC Description" value={this.state.sicDescription} onChange={(e) => this.setState({sicDescription: e.target.value})} style={{width: '100%'}}/></Grid>
                    <Grid item xs={12}><FormControlLabel label="Has Fiber" control={<Switch checked={this.state.hasFibre} onChange={(e) => this.setState({hasFibre: e.target.checked})}/>}  /></Grid>
                    <Grid item xs={12}><FormControlLabel label="Fiber is Available" control={<Switch checked={this.state.isFibreAvailable} onChange={(e) => this.setState({isFibreAvailable: e.target.checked})}/>} /></Grid>
                    <Grid item xs={12}><FormControlLabel label="Active Lead" control={<Switch checked={this.state.hasActiveLead} onChange={(e) => this.setState({hasActiveLead: e.target.checked})}/>}  /></Grid>
                    <Grid item xs={12}><FormControlLabel label="Cancel Pending" control={<Switch checked={this.state.isCancelPending} onChange={(e) => this.setState({isCancelPending: e.target.checked})}/>}  /></Grid>
                    <Grid item xs={12}><TextField label="Landline Number" type="number" value={this.state.landlineNo} onChange={(e) => this.setState({landlineNo: e.target.value})} style={{width: '100%'}}/></Grid>
                    <Grid item xs={12}><TextField label="Mobile Number" type="number" value={this.state.mobileNo} onChange={(e) => this.setState({mobileNo: e.target.value})} style={{width: '100%'}}/></Grid>
                    <Grid item xs={12}><FormControlLabel label="Interested" control={<Switch checked={this.state.interested} onChange={(e) => this.setState({interested: e.target.checked})}/>}  /></Grid>
                    <Grid item xs={12}><Button onClick={() => this.submitData()} variant="contained" style={{width: '100%', borderRadius: '0', color: 'white', boxShadow: 'none'}} color="secondary">Add Business</Button></Grid>
                </Grid>
                <IssueBox open={this.state.errorUI} callBack={this.closeError.bind(this)} errorString={this.state.errorMsg} buttonText="Ok" /> 
            </AbstractDash>
        );
    }
}