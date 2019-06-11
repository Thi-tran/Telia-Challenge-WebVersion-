import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            searchOption: '',
            keyword: '',
            error: ''
        }
    }

    onHandleChangeSearch = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted ' + this.state.searchOption )
        if (!this.state.searchOption || !this.state.keyword) {
            this.setState({error: 'Please choose what you want to search'});
        } else {
            // Search option here 
            if (this.state.searchOption === "freelancers") {
                this.setState({
                    error: ''
                });
            } else if (this.state.searchOption === "projects") {
                
            }
        }
    }
    
    render() {
        return (
            <div style={{textAlign: 'center', marginTop: 100}}>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        value={this.state.keyword}
                        name="keyword"
                        onChange={this.onHandleChangeSearch}
                        style={{fontSize: 25, marginRight: 10, marginLeft: 10}}
                    />
                    <select 
                        className="custom-select" 
                        style={{fontSize: 25, marginRight: 10, marginLeft: 10}}
                        value={this.state.searchOption} 
                        name="searchOption"
                        onChange={this.onHandleChangeSearch}
                    >            
                        <option value="" hidden>Search for</option>
                        <option value="freelancers">Freelancers</option>
                        <option value="projects">Open projects</option>
                        <option value="freeteam">Freelancers Team</option>
                    </select>
                    <Button variant="contained" color="secondary" type="submit" style={{marginBottom: 10, marginRight: 10, marginLeft: 10}}>
                        Find
                    </Button>
                </form>                
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        )
    }
}
