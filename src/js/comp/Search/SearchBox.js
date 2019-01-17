import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import VerifiedIcon from '@material-ui/icons/VerifiedUser';
import LocationIcon from '@material-ui/icons/MyLocation';
import Grow from '@material-ui/core/Grow';


import { searchBox, searchBoxSearch } from '../../../css/Search.css';
import { RatingUI } from '../Map/Rating';

export default class SearchBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchData: null,
            isSearching: false,
            searchVal: ''
        }
    }
    onSearch(val){
        this.setState({searchVal: val}, () =>{
            let value = this.state.searchVal;

            if(value != '' || value != ' ' || value != null){
                console.log('%cSEARCH: searching for ' + value, 'color: green');
                
                (async() => {
                    console.log('%cSEARCH: api/business.php?type=search&query=' + value + '&limit=3', 'color: green');
    
                    const searchData = await fetch('api/business.php?type=search&query=' + value + '&limit=3', {
                        method: 'GET'
                    });
                    const searchRet = await searchData.json();
                    console.log('%cSEARCH: returned data:', 'color: green');
                    console.log(searchRet);
                    
                    
                    if(searchRet.data){
                        this.setState({searchData: searchRet.data, isSearching: true});
                    }else{
                        this.setState({isSearching: false});
                    }
        
                })();
            }else{
                this.setState({isSearching: false});
            } 

        });
    
    }
    searchPress(data){
        this.props.searchCallback(data);
        this.setState({searchVal: '', isSearching: false});
    }
    render(){
        return(
            <div className={searchBox}>
                <Grid container className={searchBoxSearch}>
                    <Grid item xs={2} md={2}><SearchIcon style={{marginTop: '5%'}}/></Grid>
                    <Grid item xs={10} md={10}><InputBase placeholder="Search Business Name/Type" value={this.state.searchVal} onChange={(e) => this.onSearch(e.target.value)} style={{width: '100%'}}/></Grid>
                </Grid>
                {this.state.isSearching == true ? 
                <List>
                    {this.state.searchData.map((e, i) => {
                        return <SearchCard key={i} data={e} onGetData={this.searchPress.bind(this)}/>
                    })}
                </List> 
                :
                null}
            </div>
        );
    }
}


class SearchCard extends Component {
    constructor(props){
        super(props);
    }
    onSelectItem(){
        this.props.onGetData(this.props.data);
    }
    render(){
        return(
            <Grow in={true}>
                <ListItem button onClick={() => this.onSelectItem()} style={{padding: '8px 20px', margin: '10px 0px', boxShadow: '1px 2px 1px rgb(40, 40, 40, 0.3)', borderBottom: 'solid #00a4c4 2px', backgroundColor: 'rgb(250, 250, 250)'}}>
                    <ListItemIcon>
                        {this.props.data.hasActiveLead ? <VerifiedIcon /> : <LocationIcon />}
                    </ListItemIcon>
                    <ListItemText 
                        primary={this.props.data.name} 
                        secondary={this.props.data.businessType} 
                    />
                </ListItem>
            </Grow>
        );
    }
}