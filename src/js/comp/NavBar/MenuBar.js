import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import { menuList } from '../../../css/NavBar.css';
import Filter from './Filter';
import SettingsDash from '../Dashboard/SettingsDash';
import BusinessDash from '../Dashboard/BusinessDash';
import UsersDash from '../Dashboard/UsersDash';



export default class MenuBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuContent: null,
            settingDash: false,
            usersDash: false,
            businessDash: false
        }

        console.log("Menu bar receives " + props.rating);
        
    }
    componentWillReceiveProps(newprops){
        this.props = newprops;
    }
    businessButton(){
        this.setState({businessDash: true});
    }
    logOut(){
        console.log("logout");
    }
    settings(){
        this.setState({settingDash: true});
    }
    usersButton(){
        this.setState({usersDash: true});
    }
    disableSettings(){
        this.setState({settingDash: false});
    }
    disableBusiness(){
        this.setState({businessDash: false});
    }
    disableUsers(){
        this.setState({usersDash: false});
    }
    componentWillReceiveProps(){
        const loggedInContent = [
            <h2 style={{paddingLeft: '16px'}}>Menu</h2>,
            <Divider width="90%" />,
            <ListItem button onClick={() => this.settings()}><ListItemText primary={"Settings"}/></ListItem>,
            <ListItem button onClick={() => this.businessButton()}><ListItemText primary={"Businesses"}/></ListItem>,
            <ListItem button onClick={() => this.logOut()}><ListItemText primary={"Log Out"}/></ListItem>,
            <Filter toggleRating={this.props.toggleRating.bind(this)} rating={this.props.rating} radius={this.props.radius} updateRadius={this.props.updateRadius.bind(this)}/>
        ];

        const adminInContent = [
            <h2 style={{paddingLeft: '16px'}}>Admin Menu</h2>,
            <Divider width="90%" />,
            <ListItem button onClick={() => this.settings()}><ListItemText primary={"Settings"}/></ListItem>,
            <ListItem button onClick={() => this.businessButton()}><ListItemText primary={"Businesses"}/></ListItem>,
            <ListItem button onClick={() => this.usersButton()}><ListItemText primary={"Users"}/></ListItem>,
            <ListItem button onClick={() => this.logOut()}><ListItemText primary={"Log Out"}/></ListItem>,
            <Filter toggleRating={this.props.toggleRating.bind(this)} rating={this.props.rating} radius={this.props.radius} updateRadius={this.props.updateRadius.bind(this)}/>
        ];

        const notLoggedContent = [
            <h2 style={{paddingLeft: '16px'}}>Menu</h2>,
            <Divider width="90%" />,
            <ListItem button onClick={() => this.helpButton()}><ListItemText primary={"Contact"}/></ListItem>
        ];

        this.setState({menuContent: this.props.loggedIn ? this.props.admin == 1 ? adminInContent : loggedInContent : notLoggedContent});
    }
    panTo(val){
        this.props.panTo(val);
        this.disableBusiness();
    }
    render(){
            return(
                <div>
                    <Drawer anchor="left" open={this.props.menuOpen} onClose={this.props.closeMenu}>
                        <List className={menuList}>
                            {this.state.menuContent ? this.state.menuContent.map((el, i) => {
                                return (
                                    <div key={i}>{el}</div>
                                );
                            }) : 'Loading'}
                        </List>
                    </Drawer>
                    <SettingsDash enabled={this.state.settingDash} disableHandler={this.disableSettings.bind(this)}/>
                    <BusinessDash enabled={this.state.businessDash} disableHandler={this.disableBusiness.bind(this)} businessData={this.props.businessData} lat={this.props.lat} long={this.props.long} panTo={this.panTo.bind(this)}/>
                    <UsersDash enabled={this.state.usersDash} disableHandler={this.disableUsers.bind(this)} admin={this.props.admin}/>
                </div>
            );
    }
}