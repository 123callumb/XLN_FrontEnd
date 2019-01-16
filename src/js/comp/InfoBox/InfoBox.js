import React, { Component } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

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
                        <Grid item xs={2} style={{textAlign: 'left'}}><Button onClick={() => this.props.closeHandler()} color="secondary">x</Button></Grid>
                        <Divider width="80%" style={{marginBottom: '10px', marginLeft: 'auto', marginRight: 'auto'}}/>
                        <Grid container>
                            <Grid item xs={6} style={{textAlign: 'center'}}>Post Code:{this.props.data.postCode}</Grid>
                            <Grid item xs={6} style={{textAlign: 'center'}}>Has Lead:<Chip label={this.props.data.hasActiveLead ? 'Has Lead' : 'No Lead'} variant="default" style={{backgroundColor: this.props.data.hasActiveLead ? '#00A05B' : 'none'}}/></Grid>
                        </Grid>
                        <Grid item xs={12}><Button variant="contained" style={{width: '100%', borderRadius: '0', color: 'white', boxShadow: 'none'}} color="secondary">More Details &gt;&gt;</Button></Grid>
                    </Grid>
                </div>
                :null} 
            </Drawer>
        );
    }
}