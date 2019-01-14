import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './js/util/serviceWorker';

import NavBar from './js/comp/NavBar/NavBar';

import './css/default.css';


class App extends Component {
  componentDidMount(){
      //  Just to combat some typography stuff we won't be using anyways.
      //  Ignore this basically.
      window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
  }
  render(){
    return(
      <div>
        <NavBar /> 
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

//  Mainly for cache usage/reasons 
serviceWorker.unregister();