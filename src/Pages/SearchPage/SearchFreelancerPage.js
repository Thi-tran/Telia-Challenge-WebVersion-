import React, { Component } from 'react'
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import {Link} from 'react-router-dom';
const category = "freelancer"

export default class SearchPage extends Component {
    state = {
        searchList: []
    }
    async componentDidMount() {
        const { keyword } = this.props.match.params
        await fetch(`https://team-up-server.herokuapp.com/search/${category}/${keyword}`)
            .then(response => response.json())
            .then(searchList => this.setState({searchList}));
    }
    render() {
        console.log(this.props.match.params);
        const { keyword } = this.props.match.params
        const {searchList} = this.state;
        console.log(searchList);
        return (
            <div>
                <Navbar />
                <h2>{category} with <span style={{textDecoration: 'underline'}}>{keyword}</span> skills</h2>
                <div style={{width: '80%', paddingLeft: 300}}>
                    {searchList.map(item => <SearchItem item={item} category={category} id={item._id} key={item._id} />)}
                </div>
                <Footer />
            </div>
        )
    }
}

class SearchItem extends Component {
    render() {
        const {profile} = this.props.item;
        const {id} = this.props;
        console.log(profile);
        const starLogo = "https://image.flaticon.com/icons/svg/291/291205.svg";
        const link = `/freelancer/${id}`;
        return (
            <div style={{display: 'flex', marginBottom: 30}}>
                <div className="span-1-of-3">
                    <img src={profile.picture} style={profilePic} />
                </div>
                <div className="span-2-of-3" style={{marginLeft: 20}}>
                    <Link to={link}><h4 style={{color: '#ffa801'}}><strong>{profile.fullName}</strong></h4></Link>
                    <h6 style={{fontStyle: 'bold'}}>{profile.title}</h6>
                    <div style={{display: 'flex'}}><img src={starLogo} style={{width: 30}}/> <span style={{fontSize: 20, marginLeft: 10}}>{profile.rating}</span></div>
                    <div>{profile.description}</div>
                    <div>
                        <h5>Skills</h5>
                        <div>
                            {profile.skillList.map(skill => <span key={skill._id} style={{marginRight: 5, backgroundColor: '#d2dae2', padding: '5px 5px', borderRadius: 5}}>{skill.skillName}</span>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const profilePic = {
    width: 200,
    height: 200,
    borderRadius: '50%',

}