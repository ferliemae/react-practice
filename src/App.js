import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import LogIn from './LogIn';
import SignUp from './SignUp';
import fire from 'firebase';
import {Link, Route} from 'react-router-dom';

const auth = fire.auth();
class App extends Component {
  state = {
    logged: null
  }
  componentWillMount() {
    auth.onAuthStateChanged(firebase =>{
      if(firebase){
        this.setState({
          logged: true
        })
      }
      else{
        this.setState({
          logged: false
        })
      }
    });
  }
  render() {
      if(this.state.logged){
       return(
          <div>
          <Header />
          <Main />
          </div>
        );
      }
      else{
        return (
          <div>
            <ul>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/signup'>SignUp</Link></li>
            </ul>
            <Route path="/login" component={LogIn}/>
            <Route path="/signup" component={SignUp}/>
          </div>
        );
      } 
  }
}

export default App;
