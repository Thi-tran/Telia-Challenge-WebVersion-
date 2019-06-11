import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { BrowserRouter as Link } from "react-router-dom";

export default class Header extends Component {
    render() {
      const logo = require('../assets/Logo.jpg');
        return (
            <div style={{display: 'flex', justifyContent: 'space-between'}}> 
              <Link to="/"><img src={logo} className="logo" style={logoStyle} alt="logo"/></Link>
              <div style={{paddingTop: 15, display: 'flex-end'}}>
                <Button style={{color: '#05c46b'}}>
                  Sign In
                </Button>
                <Button style={{color: '#05c46b'}}>
                  Sign Up
                </Button>
              </div>
            </div>
        )
    }
}

const logoStyle = {
  height: 60,
  width: 'auto',
  float: 'left',
  marginTop: 5
}
