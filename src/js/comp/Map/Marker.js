import React, { Component } from 'react';

import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';

import MarkerSvg from '../../../res/markerPoint.svg';
import MarkerTickSvg from '../../../res/markerPointTick.svg';

import { currentPosition } from './MarkerStyle';
import { markerHolderStyle, markerHolderType, markerRating } from '../../../css/Map.css';
import Rating from './Rating';

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
        this.state = {
            enableDetails: false
        }
    }
    componentWillReceiveProps(newProp){
            this.setState({
                enableDetails: newProp.zoom >= 17
            });
    }
    render(){
       return(
           <Grow in={true}>
               <div className={markerHolderStyle}>
                {this.state.enableDetails == true ? <Grow in={true}><p className={markerHolderType}>{this.props.data.businessType}</p></Grow> : null}
                {this.props.rating == true && this.state.enableDetails ? <Slide direction="right" in={true}><Rating stars={this.props.data.rating}/></Slide> : null}
                <img src={this.props.data.hasActiveLead ? MarkerTickSvg : MarkerSvg} height="100%" onClick={() => this.props.onInfoTap(this.props.data)}/>
               </div>
           </Grow>
        );
    }
}

export class CleanMarker extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={markerHolderStyle}>
                <img src={MarkerSvg} height="100%"/>
            </div>
       );
    }
}
