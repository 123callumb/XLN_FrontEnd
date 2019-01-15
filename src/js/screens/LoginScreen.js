import React, { Component } from 'react';
import LoginBox from '../comp/Login/LoginBox';
import NavBar from '../comp/NavBar/NavBar';
import SnackBar from '@material-ui/core/Snackbar';

import { loginScreenBack } from '../../css/Login.css';

export default class Login extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={loginScreenBack}>
                <NavBar loggedIn={false} />
                <LoginBox loginReturn={this.props.loginReturn.bind(this)}/>
                <SnackWarner authError={this.props.authError}/>
            </div>
        )
    }
}

class SnackWarner extends Component {
    constructor(props){
        super(props);
        this.state = {
            enabled: false
        }   
    }
    componentWillReceiveProps(){
        this.setState({enabled: this.props.authError});
    }
    render(){
        return (
            <SnackBar ContentProps={{style: {backgroundColor: 'rgb(40, 40, 40)'}}} autoHideDuration={4000} open={this.state.enabled}  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} message={<span>Incorrect Details, Please try again...</span>} />
        );
    }
}
