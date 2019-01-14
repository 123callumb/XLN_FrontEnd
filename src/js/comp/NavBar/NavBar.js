import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';

class NavBar extends Component {
    constructor(){
        super();
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
                <AppBar position="fixed">
                    <Grid container>
                        <Grid item md={1}>
                            <IconButton color="inherit" style={{width: '50px'}} onClick={() => this.onMenuButton()}>
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item md={6}>
                            <p>App Name here maybe? hmm..</p>
                        </Grid>
                    </Grid>
                </AppBar>
                <MenuBar menuOpen={this.state.menuOpen} closeMenu={this.closeMenu.bind(this)}/>
            </div>
        );
    }
}

//  This will be an example of a menu bar that we can have
class MenuBar extends Component {
    constructor(props){
        super(props);
    }
    signOutButton(){
        console.log("Sign out button pressed");
    }
    render(){
        return(
            <Drawer anchor="left" open={this.props.menuOpen} onClose={this.props.closeMenu}>
                <List>
                    <ListItem button onClick={() => this.homeButton()}>
                        <ListItemText primary={"Home"}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={"Test"}/>
                    </ListItem>
                    <ListItem button onClick={() => this.signOutButton()}>
                        <ListItemText primary={"Sign Out"} />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default NavBar;