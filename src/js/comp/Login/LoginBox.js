import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

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
                }else{
                    console.log(resp.error);
                }

            }catch(e){  
                console.log("Could not log in online, going to developer mode!" + e);
            }
        })();

        console.log("Finsihed async");


        //This is here for now
        this.props.loginReturn({
            username: user,
            sessionID: 13378654321
        });
    } 
    render(){
        return(
            <Grow in={true}>
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
            </Grow>
        );
    }
}