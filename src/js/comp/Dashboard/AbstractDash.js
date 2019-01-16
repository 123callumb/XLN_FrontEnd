import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

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
            <Drawer open={this.props.enabled} anchor="top">
                <div style={{height: '100vh', padding: '20px'}}>
                    <Button color="secondary" variant="outlined" onClick={() => this.closeDash()} style={{textAlign: 'right'}}>X</Button>
                    {this.props.children}
                </div>
            </Drawer>

        );
    }
}