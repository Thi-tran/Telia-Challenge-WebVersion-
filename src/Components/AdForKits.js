import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class AdForKits extends Component {
    render() {
        const TeliaLogo = require('../assets/telia-company-logo.svg');
        const OPLogo = require('../assets/OP-logo.png');
        return (
            <div style={{marginTop: 30}}>
                <div className="" id="Home">
                    <div className="ad-container">
                        <div className="col span-1-of-3 box" style={{width: '33%', marginTop: 50}}>
                            <Link to="/kit">
                                <div className="feature-box">
                                
                                    <p className="feature-box__text paragraph"  style={{textDecoration: 'none', color: '#000', fontSize: 25}}>
                                        Get your perfect Kits
                                        <br/>
                                        Sponsor by:
                                    </p>

                                        <img src={TeliaLogo} style={logo}/>
                                    <img src={OPLogo} style={logo}/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const logo = {
    height: 50,
    marginLeft: 10,
    marginRight: 10,
}