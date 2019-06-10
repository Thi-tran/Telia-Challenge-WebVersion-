import React, { Component } from 'react'
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Banner from '../Components/Banner';
import SearchBar from '../Components/SearchBar';

export default class Homepage extends Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <Header />
                <Banner />
                <SearchBar />
            </div>
        )
    }
}
