import React, { Component } from 'react'
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import {Link} from 'react-router-dom';
const category = "freelancer"

const searchList = [
    {
    _id: "5d01cda2192f7700243d655c",
    email: "Bill.Gates@gmail.com",
    password: "thi123",
    profile: {
    _id: "5d00db64faac9a46cc233a09",
    skillList: [
    {
    _id: "5d00db64faac9a46cc233a0d",
    skillName: "Innovation"
    },
    {
    _id: "5d00db64faac9a46cc233a0c",
    skillName: "Competing"
    },
    {
    _id: "5d00db64faac9a46cc233a0b",
    skillName: "Marketing"
    },
    {
    _id: "5d00db64faac9a46cc233a0a",
    skillName: "Rich"
    }
    ],
    fullName: "Bill Gates",
    location: "Seattle, California, USA",
    picture: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg",
    title: "Project Manager",
    description: "A Project Manager who loves new challenges. Trying new things all the time!",
    rating: 4.5
    },
    project: [ ],
    __v: 0
    },
    {
    _id: "5d01cead192f7700243d6562",
    email: "Larry.Ellison@gmail.com",
    password: "thi123",
    profile: {
    _id: "5d00db64faac9a46cc233a09",
    skillList: [
    {
    _id: "5d01cead192f7700243d6567",
    skillName: "Product Development"
    },
    {
    _id: "5d01cead192f7700243d6566",
    skillName: "Developer"
    },
    {
    _id: "5d01cead192f7700243d6565",
    skillName: "Product Exaggerate"
    },
    {
    _id: "5d01cead192f7700243d6564",
    skillName: "Marketing Strategy"
    }
    ],
    fullName: "Larry Ellison",
    location: "NewYork, USA",
    picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Larry_Ellison_picture.png/220px-Larry_Ellison_picture.png",
    title: "Project Manager",
    description: "a Project Manager who likes to develop a project, but likes to brag about it more",
    rating: 4.3
    },
    project: [ ],
    __v: 0
    },
    {
    _id: "5d01cf52192f7700243d6568",
    email: "Elon.Musk@gmail.com",
    password: "thi123",
    profile: {
    _id: "5d00db64faac9a46cc233a09",
    skillList: [
    {
    _id: "5d01cf52192f7700243d656d",
    skillName: "Product Development"
    },
    {
    _id: "5d01cf52192f7700243d656c",
    skillName: "Sarcasm"
    },
    {
    _id: "5d01cf52192f7700243d656b",
    skillName: "Twitter Marketing"
    },
    {
    _id: "5d01cf52192f7700243d656a",
    skillName: "Marketing Strategy"
    }
    ],
    fullName: "Elon Musk",
    location: "California, USA",
    picture: "https://media.wired.com/photos/5c83219a692d1216df5ce666/master/pass/Transpo-Elon-Musk-RTX6P9YW.jpg",
    title: "Tesla CEO and Twitter fan",
    description: "Jeff who?",
    rating: 4.7
    },
    project: [ ],
    __v: 0
    }
];


export default class SearchPage extends Component {
    state = {
        searchList: []
    }
    // async componentDidMount() {
    //     const { keyword } = this.props.match.params
    //     await fetch(`https://team-up-server.herokuapp.com/search/${category}/${keyword}`)
    //         .then(response => response.json())
    //         .then(searchList => this.setState({searchList}));
    // }
    render() {
        const { keyword } = this.props.match.params
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