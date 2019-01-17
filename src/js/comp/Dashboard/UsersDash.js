import React, { Component } from 'react';
import AbstractDash from './AbstractDash';

import LinearProgress from '@material-ui/core/LinearProgress';
import AccountIcon from '@material-ui/icons/AccountBoxOutlined'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grow from '@material-ui/core/Grow';

export default class UsersDash extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: null,
            loaded: false
        }
    }
    componentWillReceiveProps(newProps){
        if(newProps.admin == 1){
            this.loadUsers();
        }
    }   
    loadUsers(){
        (async() => {

            try{
                const userReq = await fetch('api/auth.php?type=cmslist', {method: 'GET'});
                const userRes = await userReq.json();

                if(userRes.data){
                    this.setState({userData: userRes.data, loaded: true});
                }else{
                    this.setState({loaded: false});
                }

            }catch(e){
                console.log("%cUSERS PANEL: Could not load user list exception: " + e, 'color: red');   
            }
        })();
    }
    render(){
        return (
            <AbstractDash enabled={this.props.enabled} disableHandler={this.props.disableHandler.bind(this)}>
                <div style={{textAlign: 'center', marginBottom: '30px'}}>
                    <h2>Users</h2>
                    <List>
                        {this.state.loaded ? 
                        this.state.userData.map((e, i) => {
                            return <UserItem data={e} key={i}/>
                        })
                        :
                        <LinearProgress variant="indeterminate" color="secondary"/>
                        }
                    </List>
                </div>
            </AbstractDash>
        );

    }
}


class UserItem extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Grow in={true}>
                <ListItem button style={{padding: '10px 0', margin: '10px 0px', boxShadow: '1px 2px 1px rgb(40, 40, 40, 0.3)', borderBottom: 'solid #00a4c4 2px'}}>
                    <ListItemIcon style={{padding: '10px'}}><span><AccountIcon /></span></ListItemIcon>
                    <ListItemText 
                        style={{maxWidth: '75%', paddingLeft: '10px'}}
                        primary={this.props.data.username}
                        secondary={this.props.data.admin ? 'Admin' : 'User'}
                    />
                </ListItem>
            </Grow>
        );
    }
}
