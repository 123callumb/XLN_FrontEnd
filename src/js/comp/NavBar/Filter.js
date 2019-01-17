import React, { Component } from 'react';

import FilterIcon from '../../../res/filterIcon.svg';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/lab/Slider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const sliderTheme = createMuiTheme({
    slider: {
      trackColor: '#00a4c4',
      selectionColor: '#077d8c'
    },
  });

export default class Filter extends Component {
    constructor(props){
        super(props);
        console.log("Should be constructing again with rating toggle: " + props.rating);
        
    }
    componentWillReceiveProps(newProps){
        console.log("Did get new porops, rating of" + newProps.rating);
        
        this.props = newProps;
    }
    render(){
        return(
            <div style={{width: '33vw', minWidth: '150px', padding: '16px'}}>
                <h3 style={{fontSize: '1.1em'}}>Filter Settings</h3>
                <Divider width="90%" />
                <p>Toggle Ratings</p>
                <Button variant={this.props.rating == true ?  'contained' : 'outlined'} color="secondary" onClick={() => {this.props.toggleRating(true)}} style={{margin: '2%', color: this.props.rating == true ? 'white' : '#00a4c4'}}>ON</Button>
                <Button variant={this.props.rating == false ? 'contained' : 'outlined'} color="secondary" onClick={() => {this.props.toggleRating(false)}} style={{margin: '2%', color: this.props.rating == true ? '#00a4c4' : 'white'}}>OFF</Button>
                <p>Range: {this.props.radius}</p> 
                <MuiThemeProvider theme={sliderTheme}>
                    <Slider onChange={(e, v) => this.props.updateRadius(v)} value={this.props.radius} max={10} min={1} step={1}/>
                </MuiThemeProvider>
            </div>
        );
    }
}