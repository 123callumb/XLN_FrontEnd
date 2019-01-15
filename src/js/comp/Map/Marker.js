import React, { Component } from 'react';

import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';

import MarkerSvg from '../../../res/markerPoint.svg';

import { currentPosition } from './MarkerStyle';
import { markerHolderStyle } from '../../../css/Map.css';

export class PositionMarker extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(<div style={currentPosition}></div>);
    }
}

// Need to move this to a new class
export class Marker extends Component {
    constructor(props){
        super(props);
    }

    render(){
       return(
           <Grow in={true}>
               <div className={markerHolderStyle}>
                <Slide direction="right" in={true}><p>{this.props.data.type}</p></Slide>
                <img src={MarkerSvg} height="100%" />
               </div>
           </Grow>
        );
    }
}
