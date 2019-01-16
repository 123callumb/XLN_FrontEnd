import React, { Component } from 'react';
import AbstractDash from './AbstractDash';

export default class SettingsDash extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <AbstractDash enabled={this.props.enabled} disableHandler={this.props.disableHandler.bind(this)}>
                <h3>Settings:</h3>
            </AbstractDash>
        );
    }
}