import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Login from './Login';
import Decrypt from './Decrypt';

class App extends Component {
  constructor (props){
    super(props);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.callLoginFunction = this.callLoginFunction.bind(this);
    this.changeEnv = this.changeEnv.bind(this);
    this.state = {
      loggedIn : false,
      authToken : '',
      error:{},
      env:'dev.'
    }
  }
  changeEnv (env){
    this.setState((prevState)=>{
      const newState = prevState;
      newState.env = env;
      return newState;
    })
  }
  callLoginFunction (data){
    const url = "https://"+data.env+"imibot.ai/api/v1/user/login/";
    const headers = {
      "Content-type":"application/json"
    }
    const logindata = {
      email: data.email,
      password: data.password
    }
    axios.post(url,logindata,headers)
      .then((response)=>{
        console.log(response.data);
        this.setState((prevState)=>{
          const newState = prevState;
          newState.loggedIn = true;
          newState.authToken = response.data.auth_token;
          newState.error ={};
          return newState;
        })
        console.log(this.state)
      })
      .catch((error)=>{
        if(error.response){
          console.log(error.response.data);
          this.setState((prevState)=>{
            const newState = prevState;
            newState.error = {
              errorStatus : error.response.status,
              errorMessage : error.response.data["message"],
              errorFound : true
            }
            return newState
          })
        }
      })
  }
  toggleLogin(data){
    this.setState((prevState)=>{
      this.callLoginFunction(data);
    })
  }
  render(){
    return(
      <div className="darkbg">
        {this.state.loggedIn ? <Decrypt authToken = {this.state.authToken} env = {this.state.env}/> : <Login logUserIn={this.toggleLogin} changeEnv = {this.changeEnv}/>}
        {this.state.error.errorFound ? <p>{this.state.error.errorMessage}</p>: null}
      </div>
    )
  }
}
export default App;
