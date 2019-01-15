import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';

import { menuList } from '../../../css/NavBar.css';
import Filter from './Filter';


export default class MenuBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuContent: null
        }
        this.helpButton = this.helpButton.bind(this);
    }
    signOutButton(){
        console.log("Sign out button pressed");
    }
    homeButton(){
        console.log("Press home button");
    }
    helpButton(){
        console.log("Help button Pressed");
    }
    componentDidMount(){
        const loggedInContent = [
            <ListItem button onClick={() => this.homeButton()}><ListItemText primary={"Home"}/></ListItem>,
            <Filter />
        ];

        const notLoggedContent = [
            <ListItem button onClick={() => this.helpButton()}><ListItemText primary={"Contact"}/></ListItem>
        ];

        this.setState({menuContent: this.props.loggedIn ? loggedInContent : notLoggedContent});
    }
    render(){
            return(
                <Drawer anchor="left" open={this.props.menuOpen} onClose={this.props.closeMenu}>
                    <List className={menuList}>
                        {this.state.menuContent ? this.state.menuContent.map((el, i) => {
                            return (
                                <div key={i}>{el}</div>
                            );
                        }) : 'Loading'}
                    </List>
                </Drawer>
            );
    }
}