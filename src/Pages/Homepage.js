import React, { Component } from 'react'
import Navbar from '../Components/Navbar';
import Banner from '../Components/Banner';
import Search from '../Components/Search';
import AdForKits from '../Components/AdForKits';
import HowItWork from '../Components/HowItWork';
import Footer from '../Components/Footer';

export default class Homepage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Banner />
                <Search />
                <AdForKits />
                <HowItWork />
                <Footer />
            </div>
        )
    }
}
