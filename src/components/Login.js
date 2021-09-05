import React from "react";
import LoginModal from "react-login-modal";

export default class Login extends React.Component {

    state = {
        error: "",
        errorEnable: false
        }
        
  validateName = (username) => {
    return username.length >= 3;
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword = (pass) => {
    return pass.length >= 8;
  }

  handleSignup = (username, email, password) => {
      if(!this.validateEmail(email)) {
        this.setState({error:"Incorrect Email Address",errorEnable:true});
        return;
      }
      if(!this.validatePassword(password)) {
        this.setState({error:"Incorrect Password",errorEnable:true});
        return;
      }
      if(!this.validateName(username)) {
        this.setState({error:"Incorrect UserName",errorEnable:true});
        return;
      }
      this.setState({errorEnable:false});
      this.setState({error:''});
  };

  handleLogin = (username, password) => {
      console.log(username, password);
      if(!this.validatePassword(password)) {
        this.setState({error:"Incorrect Password",errorEnable:true});
        return;
      }
      if(!this.validateName(username)) {
        this.setState({error:"Incorrect UserName",errorEnable:true});
        return;
      }
      this.setState({errorEnable:false});
      this.setState({error:''});
      window.location.replace("/random");
  }
 
  render() {
    return (
      <div style={{display:"flex",flexDirection:"column"}}>
      <h3 style={{color:"red",alignSelf:"center"}}> {this.state.error} </h3>
      <LoginModal
        handleSignup={this.handleSignup}
        handleLogin={this.handleLogin}
      />
      </div>
    );
  }
  }