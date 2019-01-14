import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';

import LogoIcon from '../../../res/logo.svg';

import { menuList } from '../../../css/NavBar.css';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuOpen: false
        }
    }
    onMenuButton(){
        this.setState({menuOpen: true});
    }
    closeMenu(){
        this.setState({menuOpen: false});
    }
    render(){
        return(
            <div>
                <AppBar position="fixed" color="primary">
                    <Grid container>
                        <Grid item md={1} xs={2}>
                            <IconButton color="inherit" style={{width: '50px'}} onClick={() => this.onMenuButton()}>
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item md={9} xs={8}>
                            <div style={{textAlign: 'center'}}><img src={LogoIcon} height="45px"></img></div>
                        </Grid>
                    </Grid>
                </AppBar>
                <MenuBar menuOpen={this.state.menuOpen} closeMenu={this.closeMenu.bind(this)} loggedIn={this.props.loggedIn}/>
            </div>
        );
    }
}

//  This will be an example of a menu bar that we can have
class MenuBar extends Component {
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
            <ListItem button onClick={() => this.homeButton()}><ListItemText primary={"Home"}/></ListItem>
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

export default NavBar;