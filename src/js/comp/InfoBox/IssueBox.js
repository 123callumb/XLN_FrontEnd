import React, { Component } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

function slideTran(props) {
    return <Slide direction="up" {...props} />;
  }

export default class IssueBox extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Dialog open={this.props.open} onBackdropClick={() => this.props.callBack()} disableEscapeKeyDown={true} TransitionComponent={slideTran}>
                <DialogTitle>Oooops! Something went wrong.</DialogTitle>
                <DialogContent>
                    <div style={{marginBottom: '20px'}}>{this.props.errorString}</div>
                    <Button variant="contained" color="secondary" style={{color: 'white'}} onClick={() => this.props.callBack()}>{this.props.buttonText}</Button>
                </DialogContent>
            </Dialog>
        );
    }
}