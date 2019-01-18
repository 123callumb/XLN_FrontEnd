import React, { Component } from 'react';
import AbstractDash from './AbstractDash';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IssueBox from '../InfoBox/IssueBox';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default class BusinessEdit extends Component {
    constructor(props){
        super(props);
        let bData = this.props.data;
        this.state = {
            id: bData.id,
            name: bData.name ? bData.name : '',
            businessType: bData.businessType ? bData.businessType : '',
            address: bData.address ? bData.postCode : '',
            postCode: bData.postCode ? bData.postCode : '',
            rating: bData.rating ? bData.rating : '',
            existingCustomer: bData.existingCustomer ? !!bData.existingCustomer : false,
            latitude: bData.latitude ? bData.latitude : '',
            longitude: bData.longitude ? bData.longitude : '',
            sicCode: bData ? bData.sicCode : '',
            sicDescription: bData.sicDescription ? bData.sicDescription : '',
            hasFibre: bData.hasFibre ? !!bData.hasFibre : false,
            isFibreAvailable: bData.isFibreAvailable ? !!bData.isFibreAvailable : false,
            hasActiveLead: bData.hasActiveLead ? !!bData.hasActiveLead : false,
            isCancelPending: bData.isCancelPending ? !!bData.isCancelPending : false,
            landlineNo: bData.landlineNo ? !!bData.landlineNo : '',
            mobileNo: bData.mobileNo ? bData.mobileNo : '',
            interested: bData.interested ? !!bData.interested : false,
            errorMsg: 'Please make sure all fields are filled in!',
            errorUI: false
        }
    }
    updateData(){

        try{

            (async() => {
                const updateReq = await fetch('api/business.php', {
                    method: 'POST',
                    headers: {'Accept' : 'json/application' , 'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        type: 'update',
                        table: 'businesses',
                        data: this.state
                    })
                });
    
                const updateRes = await updateReq.json();
    
                if(!updateRes.error){
                    console.log(updateRes);
                    this.props.disableHandler();
                }else{
                    this.setState({
                        errorMsg: updateRes.error,
                        errorUI: true
                    });
                }
            })();

        }catch(e){
            this.setState({
                errorMsg: e,
                errorUI: true
            });
        }
    }
    closeError(){
        this.setState({
            errorUI: false
        })
    }
    render(){
        return(
            <AbstractDash  enabled={this.props.enabled} disableHandler={this.props.disableHandler.bind(this)}>
                <h3 style={{textAlign: 'center'}}>Edit Business</h3>
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
                    <Grid item xs={12}><Button onClick={() => this.updateData()} variant="contained" style={{width: '100%', borderRadius: '0', color: 'white', boxShadow: 'none'}} color="secondary">Update</Button></Grid>
                </Grid>
                <IssueBox open={this.state.errorUI} callBack={this.closeError.bind(this)} errorString={this.state.errorMsg} buttonText="Ok" /> 
            </AbstractDash>
        );
    }
}