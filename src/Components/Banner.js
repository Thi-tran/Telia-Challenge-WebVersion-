import React, { Component } from 'react'
import Scrollchor from 'react-scrollchor';
import Button from '@material-ui/core/Button';

export default class SearchBar extends Component {
    render() {
        return (
            <div className="" id="Home">
                <header className="header">
                    <div className="hero-text-box"> 
                        <h1 style={{color: '#ffffff'}}>Nauti Kesäisestä mausta kotonasi</h1>
                    </div>
                </header>
            </div>
        )
    }
}

const inputSearch = {
    paddingLeft: 40,
    border: 'none',
    fontSize: 20
}

const inputSearchContainer = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    lineHeight: 2.1,
}

const inputSearchLabel = {
    Zindex: 9999,
    position: 'absolute',
    paddingLeft: 5,
    marginBottom: 0,
    fontSize: 20
}