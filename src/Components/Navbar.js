import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Search from './Search';

export default class Header extends Component {
    render() {
      const logo = require('../assets/Logo.png');
        return (
            <div style={{...container,display: 'flex', justifyContent: 'space-between'}} > 
              <Link to="/"><img src={logo} className="logo" style={logoStyle} alt="logo"/></Link>
              <div style={{paddingTop: 8, display: 'flex-end', paddingRight: 50}}>
                <Button style={{color: '#05c46b'}}>
                  I am a Freelancer
                </Button>
                <Button style={{color: '#05c46b'}}>
                  I am from a Company
                </Button>
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
  height: 50,
  width: 'auto',
  float: 'left',
  top: 5,
}

const container = {
  width: '80%',
  margin: '0 auto'
}