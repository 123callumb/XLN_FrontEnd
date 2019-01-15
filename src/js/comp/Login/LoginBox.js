import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

import { loginHolder, loginBoxHolder } from '../../../css/Login.css';


export default class LoginBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            tab: 'login'
        }
    }
    render(){
        return(
            <Grow in={true}>
                <Grid container>
                    <Paper className={loginHolder}>
                        <LoginHolder loginReturn={this.props.loginReturn.bind(this)} />
                    </Paper>
                </Grid>
            </Grow>
        );
    }
}


class LoginHolder extends Component {
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
        (async() => {
            try {
                console.log("Sending fetch request");
                

                const req = await fetch('api/auth.php', {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json', 'Accept' : 'application/json'},
                    body: JSON.stringify({username: user, password: pass, type: 'login'})
                });

                const resp = await req.json();
                
                console.log(resp);
                
                if(!resp.error){
                    this.props.loginReturn({data: resp.data, auth: true});    
                }else{
                    this.props.loginReturn({auth: false});
                }

            }catch(e){  
                console.log("Could not log in online, going to developer mode!" + e);
            }
        })();

    } 
    render(){
        return(
                <div className={loginBoxHolder}>
                    <TextField label="Username" placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}/>
                    <br />
                    <TextField label="Password" type="password" onChange={(e) => this.setState({password: e.target.value})}/>
                    <br />
                    <br />
                    <Button color="secondary" variant="outlined" onClick={() => this.login()}>Login</Button>
                </div>
        );
    }
}