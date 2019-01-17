import React, { Component } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { RatingUI } from '../Map/Rating';

import { infoBoxStyle, infoBoxContents } from '../../../css/InfoBox.css';


export default class InfoBox extends Component {
    constructor(props){
        super(props);
        console.log("Enable info box?" + props.data);   
    }
    render(){
        return(
            <Drawer anchor="bottom" classes={{paperAnchorBottom: infoBoxStyle}} open={this.props.enabled} onClose={() => this.props.closeHandler()} style={{margin: '20px'}}>
                {this.props.data ? 
                <div className={{infoBoxContents}}>
                    <Grid container style={{padding: '2%'}}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}><h3 style={{textAlign: 'center'}}>{this.props.data.name}</h3></Grid>
                        <Divider width="80%" style={{marginBottom: '10px', marginLeft: 'auto', marginRight: 'auto'}}/>
                        <Grid container style={{margin:'auto', marginBottom: '15px', width: '80%'}}>
                            <Grid item xs={3} style={{textAlign: 'left'}}>Type: </Grid>
                            <Grid item xs={9} style={{textAlign: 'right'}}>{this.props.data.postCode ? this.props.data.businessType : 'No Postcode'}</Grid>
                            <Grid item xs={3} style={{textAlign: 'left'}}>Postcode: </Grid>
                            <Grid item xs={9} style={{textAlign: 'right'}}>{this.props.data.postCode ? this.props.data.postCode : 'No Postcode'}</Grid>
                            <Grid item xs={3} style={{textAlign: 'left'}}>Contact: </Grid>
                            <Grid item xs={9} style={{textAlign: 'right'}}>{this.props.data.mobileNo ? this.props.data.mobileNo : 'No Number'}</Grid>
                            <Grid item xs={3} style={{textAlign: 'left'}}>Rating: </Grid>
                            <Grid item xs={9} style={{textAlign: 'right'}}>{this.props.data.rating ? <RatingUI stars={this.props.data.rating} styleOpt={{color: 'black'}}/> : 'No Rating'}</Grid>
                        </Grid>
                        <Grid item xs={12}><Button variant="contained" style={{width: '100%', borderRadius: '0', color: 'white', boxShadow: 'none'}} color="secondary">More Details &gt;&gt;</Button></Grid>
                    </Grid>
                </div>
                :null} 
            </Drawer>
        );
    }
}