import React, { Component } from 'react';
import NavBar from '../comp/NavBar/NavBar';

import Map from '../comp/Map/Map';

export default class HomeScreen extends Component {
    render(){
        return(
            <div>
                <NavBar loggedIn={true}/>
                <Map />
            </div>
        );
    }
}