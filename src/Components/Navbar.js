import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Search from './Search';

export default class Header extends Component {
    render() {
      const logo = require('../assets/Logo.png');
        return (
            <div style={{backgroundColor: '#0DD17A'}} > 
              <div style={{width: '80%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', height: 60, alignItems: 'center'}}>
                <Link to="/"><img src={logo} className="logo" style={logoStyle} alt="logo"/></Link>
                <div style={{display: 'flex-end', paddingRight: 50}}>
                  <Button style={{color: '#fff'}}>
                    <span style={{fontFamily: 'Roboto', fontSize: '120%'}}>Sign In</span>
                  </Button>
                  <Button style={{color: '#fff'}}>
                    <span style={{fontFamily: 'Roboto', fontSize: '120%'}}>Sign Up</span>
                  </Button>
                </div>
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