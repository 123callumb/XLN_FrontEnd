import React, { Component } from 'react';
import LoginBox from '../comp/Login/LoginBox';
import NavBar from '../comp/NavBar/NavBar';

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
            </div>
        )
    }
}
