import React, { Component } from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Search from '../Components/Search';
import SearchItem from '../Components/SearchItem';

export default class SearchPage extends Component {
    state = {
        searchList: []
    }
    async componentDidMount() {
        const { category, keyword } = this.props.match.params
        await fetch(`https://team-up-server.herokuapp.com/search/${category}/${keyword}`)
            .then(response => response.json())
            .then(searchList => this.setState({searchList}));
    }
    render() {
        console.log(this.props.match.params);
        const { category, keyword } = this.props.match.params
        const {searchList} = this.state;
        console.log(searchList);
        return (
            <div>
                <Navbar />
                <h2>{category} with "{keyword}" skills</h2>
                <div style={{width: '80%', paddingLeft: 200}}>
                    {searchList.map(item => <SearchItem item={item} category={category}/>)}
                </div>
                <Footer />
            </div>
        )
    }
}
