import React, { Component } from 'react';

import { markerRating } from '../../../css/Map.css';

export default class Rating extends Component {
    constructor(props){
        super(props);
        let starts = [];
        let amount = Math.round(this.props.stars/2);
        for(let i = 0; i < amount; i++){
            starts.push(true);
        }
        this.state = {
            rating: starts
        }

    }
    componentDidMount(){
        console.log("Adding stars");
        
    }
    render(){
        return(
            <p className={markerRating}>
                {this.state.rating.map((e, i) => {
                    return <a key={i}>&#9733;</a>
                })}
            </p>
        );
    }
}

// mwadgedale.co.uk/phpmyadmin
// xln #CoffeeMouse72

export class RatingUI extends Component {
    constructor(props){
        super(props); 
        let amount = Math.round(this.props.stars/2);
        let stars = [];
        for(let i = 0; i < amount; i++){
            stars.push(true)
        }
        this.state = {
            rating: stars
        }
        console.log("Star rating " + props.stars);
        
    }
    render(){
        return(
            <div style={this.props.styleOpt}>
                {this.state.rating.map((e, i) => {
                    return <a key={i}>&#9733;</a>
                })}
            </div>
        );
    }
}