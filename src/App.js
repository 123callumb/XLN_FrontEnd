import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './js/util/serviceWorker';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';

import Login from './js/screens/LoginScreen';

import './css/default.css';
import HomeScreen from './js/screens/HomeScreen';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fafafa',
    },
    secondary: {
      main: '#00a4c4'
    }
  },
});


class App extends Component {
  constructor(){
    super();
    this.setUserData = this.setUserData.bind(this);

    this.state = {
      currentScreen: <Login loginReturn={this.setUserData.bind(this)} loggedIn={false} authError={false}/>, // Current Screen determines what screen its on, default is Login.
      userData: null,
      loggedIn: false //  Global checker so components know - more verification on server side.
    }
  }
  componentDidMount(){
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    this.checkLoggedIn();
  }
  checkLoggedIn(){
    // For people that have logged in already and have the logged in cookie.
    if(this.state.loggedIn){
      this.setState({currentScreen: <HomeScreen userData={this.state.userData}/>});
    }else{
      this.setState({currentScreen: <Login loginReturn={this.setUserData.bind(this)} loggedIn={false} authError={true}/>});
    }
  
  }
  setUserData(userData){
    console.log(userData);
    this.setState({userData: userData.data, loggedIn: userData.auth}, () => {
      console.log("Loggedf in shoudl be " + userData.auth);
      
      this.checkLoggedIn();
    });
  }
  render(){
    return(
      <MuiThemeProvider theme={theme}>
          {this.state.currentScreen} 
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

//  Mainly for cache usage/reasons 
serviceWorker.unregister();