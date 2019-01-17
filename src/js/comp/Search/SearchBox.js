import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';

import { searchBox } from '../../../css/Search.css';

export default class SearchBox extends Component {
    onSearch(){

    }
    render(){
        return(
            <div className={searchBox}>
                <Grid container>
                    <Grid item xs={2} md={2}><SearchIcon style={{marginTop: '5%'}}/></Grid>
                    <Grid item xs={10} md={10}><InputBase placeholder="Search Business Name/Type" style={{width: '100%'}}/></Grid>
                </Grid>
            </div>
        );
    }
}