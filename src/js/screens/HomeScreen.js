import React, { Component } from 'react';
import NavBar from '../comp/NavBar/NavBar';
import Snackbar from '@material-ui/core/Snackbar';

import Map from '../comp/Map/Map';


export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            welcomeSnack: false,
            rate: false
        }
    }
    componentDidMount(){
        this.setState({welcomeSnack: true});
    }
    toggleRating(val){
        console.log("Received change of " + val);
        this.setState({
            rate: val
        }, () => this.forceUpdate());
    }
    render(){
        return(
            <div>
                <NavBar loggedIn={true} toggleRating={this.toggleRating.bind(this)} rating={this.state.rate}/>
                <Snackbar ContentProps={{style: {backgroundColor: 'rgb(40, 40, 40)'}}} autoHideDuration={4000} open={this.state.welcomeSnack} onClose={() => this.setState({welcomeSnack: false})} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} message={<span>Welcome back {this.props.userData.firstName}</span>} />
                <Map rating={this.state.rate}/>
            </div>
        );
    }
}