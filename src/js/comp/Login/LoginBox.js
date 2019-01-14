import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { loginHolder } from '../../../css/Login.css';

export default class LoginBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: 'root',
            password: 'root'
        }
    }
    login(){
        let user = this.state.username;
        let pass = this.state.password;
        
        //Fetch request here

        //This is here for now
        this.props.loginReturn({
            username: user,
            sessionID: 13378654321
        });
    } 
    render(){
        return(
            <Grid container>
                    <Paper className={loginHolder}>
                        <TextField label="Username" placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}/>
                        <br />
                        <TextField label="Password" type="password" onChange={(e) => this.setState({password: e.target.value})}/>
                        <br />
                        <br />
                        <Button color="secondary" variant="outlined" onClick={() => this.login()}>Login</Button>
                    </Paper>
            </Grid>
        );
    }
}