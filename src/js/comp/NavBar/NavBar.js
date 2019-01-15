import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';

import LogoIcon from '../../../res/logo.svg';
import MenuBar from './MenuBar';


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


export default NavBar;