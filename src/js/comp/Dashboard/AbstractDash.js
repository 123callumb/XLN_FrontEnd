import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import { abstractDashStyle } from '../../../css/Dashboard.css';

export default class extends Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(newProps){
        this.props = newProps;
    }
    closeDash(){
        this.props.disableHandler();
    }
    render(){
        return(
            <Drawer open={this.props.enabled} anchor="right" classes={{paperAnchorRight: abstractDashStyle}}>
                <div style={{backgroundColor: 'white', width: '100%'}}>
                    <Button color="secondary" variant="text" style={{padding: '20px'}} onClick={() => this.closeDash()}><BackIcon/>Back</Button>
                </div>
                <div style={{width: '100%', padding: '10px', boxSizing: 'border-box'}}>
                    {this.props.children}
                </div>
            </Drawer>

        );
    }
}