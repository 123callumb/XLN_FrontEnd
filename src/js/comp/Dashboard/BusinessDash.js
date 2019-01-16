import React, { Component } from 'react';
import AbstractDash from './AbstractDash';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class BusinessDash extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            lat: null,
            lng: null
        }
    }
    componentWillReceiveProps(){
        
    }
    render(){
        return(
            <AbstractDash enabled={this.props.enabled} disableHandler={this.props.disableHandler.bind(this)}>
                <h3>Businesses:</h3>
                <List>
                    {/* {this.state.data ? 
                        this.state.data.map((e, i) => {
                            return <BusinessItem placeData={e} key={i}/> 
                        })
                        :
                    <LinearProgress color="secondary" variant="indeterminate" />
                    } */}
                </List>
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
            <ListItem>
                <ListItemText primary={this.props.placeData.name} />
                <ListItemSecondaryAction>{this.props.placeData.distance}</ListItemSecondaryAction>
            </ListItem>
        );
    }
}