import React, { Component } from 'react';
import AbstractDash from './AbstractDash';

export default class BusinessDash extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <AbstractDash enabled={this.props.enabled} disableHandler={this.props.disableHandler.bind(this)}>
                <h3>Business:</h3>
            </AbstractDash>
        );
    }
}