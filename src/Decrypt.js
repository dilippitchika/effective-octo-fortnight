import React, {Component} from "react";
import axios from 'axios';
import './Decrypt.css';

class Decrypt extends Component{
    constructor(props){
      super(props)
      this.toDecryptChange = this.toDecryptChange.bind(this);
      this.decryptData = this.decryptData.bind(this);
      this.state={
          toDecrypt : '',
          decryptedData : '',
          error:{}
      }
    }
    toDecryptChange (e){
        this.setState((prevState)=>{
            const newState = prevState;
            newState.toDecrypt = e.target.value;
            return newState;
        })
    }
    decryptData(){
        let url = "https://imibot.ai/api/v1/decrypt/"
        if(this.props.env){
            url ="https://"+this.props.env+"imibot.ai/api/v1/decrypt/";
        }
        const headers = {
            "auth-token":this.props.authToken,
            "Content-type":"application/json"
        }
        const config = {headers:headers}
        console.log(headers);
        const data = {
            data: this.state.toDecrypt
        }
        axios.post(url,data,config)
            .then((response)=>{
                this.setState((prevState)=>{
                    const newState = prevState;
                    newState.decryptedData = response;
                    newState.error  = {};
                    return newState;
                    
                })
                console.log(response);
            })
            .catch((error)=>{
                this.setState((prevState)=>{
                    const newState = prevState;
                    newState.error = {
                        errorStatus : error.response.status,
                        errorMessage : error.response.data["message"],
                        errorFound : true
                      }
                    return newState;
                })
            }) 

    }
    render(){
      return(
        <div className="jumbotron decryptInput">
        <h2 className="headings">Paste data to decrypt</h2>
          <textarea rows = "12" value={this.state.toDecrypt} className="form-control toDecrypt" onChange={(event)=>{event.persist();this.toDecryptChange(event)}}></textarea>
          <button className="btn btn-primary decryptButton"onClick = {this.decryptData}>Decrypt</button>
          <pre>{this.state.decryptedData ? JSON.stringify(this.state.decryptedData.data.decrypted_data,undefined,4):null}</pre>
          {this.state.error.errorFound ? <p>{this.state.error.errorMessage}</p>: null}
        </div>
      )
    }
  }
export default Decrypt;