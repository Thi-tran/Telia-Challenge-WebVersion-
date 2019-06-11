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
            this.setState({error: 'Please specify what you want to search'});
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
            <div style={{textAlign: 'center', marginTop: 30}}>
                <form onSubmit={this.handleSubmit} style={{display: 'flex', justifyContent: 'center'}} className="center">
                    <input 
                        value={this.state.keyword}
                        name="keyword"
                        class="form-control"
                        onChange={this.onHandleChangeSearch}
                        style={{fontSize: 15, marginRight: 10, marginLeft: 10, width: 300}}
                    />
                    <select 
                        className="custom-select" 
                        style={{fontSize: 15, marginRight: 10, marginLeft: 10, width: 200}}
                        value={this.state.searchOption} 
                        name="searchOption"
                        onChange={this.onHandleChangeSearch}
                    >            
                        <option value="" >Search for</option>
                        <option value="freelancers">Freelancers</option>
                        <option value="projects">Open projects</option>
                        <option value="freeteam">Freelancers Team</option>
                    </select>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>                
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        )
    }
}
