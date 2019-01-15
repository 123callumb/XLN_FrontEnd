import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

import { loginHolder, loginBoxHolder } from '../../../css/Login.css';


export default class LoginBox extends Component {
    constructor(){
        super();
        this.state = {
            tab: 'login'
        }
    }
    render(){
        return(
            <Grow in={true}>
                <Grid container>
                    <Paper className={loginHolder}>
                        <AppBar position="static">
                            <Tabs value={this.state.tab} onChange={(e, v) => this.setState({tab: v})}>
                                <Tab value='login' label="Login" style={{width: '50%'}}/>
                                <Tab value='admin' label="Admin Login" style={{width: '50%'}} />
                            </Tabs>
                        </AppBar>
                        {this.state.tab == 'admin' ? 
                        <LoginHolder loginReturn={this.props.loginReturn.bind(this)} type="admin"/>
                        :
                        <LoginHolder loginReturn={this.props.loginReturn.bind(this)} type="user"/>
                         }
                        
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

                console.log("Fetch request sent");

                const resp = await req.text();
                console.log("response is:");
                
                console.log(resp);
                
                if(!resp.error){
                    console.log(resp.data);
                    this.props.loginReturn({
                        data: resp.data,
                        type: this.props.type
                    });    
                }else{
                    console.log(resp.error);
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
                    <Button color="secondary" variant="outlined" onClick={() => this.login()}>{this.props.type} Login</Button>
                </div>
        );
    }
}