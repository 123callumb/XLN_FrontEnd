import React, { Component } from 'react';

import FilterIcon from '../../../res/filterIcon.svg';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/lab/Slider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const sliderTheme = createMuiTheme({
    slider: {
      trackColor: '#00a4c4',
      selectionColor: '#077d8c'
    },
  });

export default class Filter extends Component {
    constructor(){
        super();
        this.state = {
            starFilter: false,
            radius: 40,
        }
    }
    render(){
        return(
            <div style={{width: '33vw', minWidth: '150px', padding: '16px'}}>
                <h3 style={{fontSize: '1.1em'}}>Filter</h3>
                <FormControlLabel control={
                <Checkbox color="secondary" checked={this.state.starFilter} onChange={(e) => this.setState({starFilter: e.target.checked})}/>
                } label="View Ratings" />
                <p>Range: {this.state.radius}</p>
                <MuiThemeProvider theme={sliderTheme}>
                    <Slider onChange={(e, v) => this.setState({radius: v})} value={this.state.radius} />
                </MuiThemeProvider>
            </div>
        );
    }
}