import React, { Component } from 'react';
import AbstractDash from './AbstractDash';

import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

export default class UsersDash extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
        <AbstractDash enabled={this.props.enabled} disableHandler={this.props.disableHandler.bind(this)}>
            <div style={{textAlign: 'center', marginBottom: '30px'}}>
                <h2>Users</h2>
                <Grid container>
                    <Grid item xs={2} md={2}><span><SearchIcon style={{marginTop: '5%'}}/></span></Grid>
                    <Grid item xs={9} md={9}><TextField placeholder="Search User Name" style={{width: '100%'}}/></Grid>
                </Grid>
            </div>
        </AbstractDash>
        );

    }
}