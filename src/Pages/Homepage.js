import React, { Component } from 'react'
import Navbar from '../Components/Navbar';
import Search from '../Components/Search';


export default class Homepage extends Component {
    render() {
        return (
            <div>
                <div style={container} >
                    <Navbar />
                    <Search />
                </div>
            </div>
        )
    }
}

const container = {
    width: '80%',
    margin: '0 auto'
}