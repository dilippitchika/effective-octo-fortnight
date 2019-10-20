import React,{Component} from 'react';
import "./Login.css";
import axios from 'axios';

class Login extends Component {
    constructor(props){
      super(props);
      this.callLogin = this.callLogin.bind(this);
      this.changeEmail = this.changeEmail.bind(this);
      this.changePassword = this.changePassword.bind(this);
      this.state = {
        email : '',
        password :'',
        env : 'dev.'
      }
    }
    changeEmail(e){
        e.preventDefault();
        this.setState((prevState)=>{
        let state = {};
        state = prevState;
        state.email = e.target.value;
        return ({state})
      })
    }
    changePassword(e){
      this.setState((prevState)=>{
        let state= {};
        state = prevState;
        state.password = e.target.value;
        return ({state})
      })
    }
    setEnv(e){
        this.setState((prevState)=>{
            const newState = prevState;
            newState.env = e.target.value;
            this.props.changeEnv(newState.env);
            return newState;
        })
    }
    callLogin(e){
      e.preventDefault();
      console.log('Called login')
      const ue = {"email":this.state.email, "password":this.state.password ,"env":this.state.env};
      this.props.logUserIn(ue);
    }
    render(){
      return(
      <div className="jumbotron loginPage">
        <div>
          <h2 className="headings">Login and select Environment</h2>
        </div>
        <div className="input-group mb-3">
          <input type = "email" className = "form-control loginInput" value = {this.state.email} placeholder="Email address" onChange={(event)=>{event.persist();this.changeEmail(event)}}></input>
          <input type = "password" placeholder="Password" className = "form-control loginInput" value = {this.state.password} onChange={(event)=>{event.persist();this.changePassword(event)}}/>
        </div>
        <div>
          <label>Environment</label>
          <select value={this.state.env.value} className="form-control loginInput" onChange={(event)=>{event.persist();this.setEnv(event)}}>
            <option value="dev.">Dev</option>
            <option value="staging.">Staging</option>
            <option value="preprod.">Preproduction</option>
            <option value="">Production</option>
          </select>
        </div>
        <div>
          <button className = "btn btn-primary" onClick={this.callLogin}>Login</button>
        </div>
      </div>
      )
    }
  }
export default Login;