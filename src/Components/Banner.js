import React, { Component } from 'react'

export default class SearchBar extends Component {
    render() {
        return (
            <div className="" id="Home">
                <header className="header">
                    <div className="hero-text-box"> 
                        <h1 style={{color: '#ffffff', marginBottom: 0}}>Find a team, that works!</h1>
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