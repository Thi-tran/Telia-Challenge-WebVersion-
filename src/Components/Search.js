import React, { Component } from 'react'
import { Redirect } from 'react-router';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            searchOption: this.props.category,
            keyword: this.props.keyword,
            error: '',
            redirect: false
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
            this.setState({redirect: true});
        }
    }
    
    render() {

        const {searchOption, keyword} = this.state;
        if (this.state.redirect) {
            const link = `search/category/${searchOption}/keyword/${keyword}`;
            return <Redirect to={link} />;
        }        
        
        return (
            <div style={{textAlign: 'center', marginTop: 50}}>
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
                        <option value="" >I'm looking for</option>
                        <option value="freelancer">Freelancers</option>
                        <option value="team">Team</option>
                        <option value="project">Open Projects</option>

                    </select>
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>                
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        )
    }
}
