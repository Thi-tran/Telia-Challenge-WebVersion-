import React, { Component } from 'react'
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
import {Link} from 'react-router-dom';

// sample data

const category = "Team";
const searchList = [{
    email: "Bill.Gates@gmail.com",
    password: "thi123",
    _id: "5d00db64faac9a46cc93a09",
    profile: {
    _id: "5d00db64faac9a46cc93a09",
    skillList: [
        {
            _id: "5d00db64faac9a46cc233a0d",
            skillName: "Fullstack App Development"
        },
        {
            _id: "5d00db64faac9a46cc233a0c",
            skillName: "AR / VR"
        },
        {
            _id: "5d00db64faac9a46cc233a0b",
            skillName: "Content Marketing"
        },
        {
            _id: "5d00db64faac9a46cc233a0a",
            skillName: "Service Design"
        }
    ],
        fullName: "International Adventure",

        location: "Seattle, California, USA",

        picture: ["https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg", "https://randomuser.me/api/portraits/women/94.jpg", "https://randomuser.me/api/portraits/men/26.jpg", "https://randomuser.me/api/portraits/men/56.jpg" ],

        title: "Marketer/ Communication Manager + Designer + Frontend Developer + Backend Developer",

        description: "We are an International Team with experience in Developing Fullstack App for companies. We also have skills in AR/VR. Fun fact: We have over 3 nationalities in our team!",
        
        rating: 4.5
    },
        project: [ ],
        __v: 0
},
{
    email: "Larry.Gates@gmail.com",
    password: "thi123",
    _id: "5d00db64faac9a423c93a09",
    profile: {
    _id: "5d00db64faac9a46cc2232a09",
    skillList: [
        {
            _id: "5d00db64faac9a46cc233a0d",
            skillName: "Fullstack App Development"
        },
        {
            _id: "5d00db64faac9a46cc233a0c",
            skillName: "AI / Machine Learning"
        },

        {
            _id: "5d00db64faac9a46cc233a0a",
            skillName: "Patterns"
        },
        {
            _id: "5d00db64faac9a46cc233a0a",
            skillName: "Lawsuit"
        }
    ],
        fullName: "Get things done!",

        location: "Seattle, California, USA",

        picture: ["https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Larry_Ellison_picture.png/220px-Larry_Ellison_picture.png", "https://randomuser.me/api/portraits/women/19.jpg", "https://randomuser.me/api/portraits/men/71.jpg", "https://randomuser.me/api/portraits/men/59.jpg" ],

        title: "Project Manager + UX/UI Designer + Frontend Developer + Backend Developer",

        description: "If you want to get a clean, good quality project, here we are! We have experience developing Fullstack App for companies. Our team has huge interest in AI / ML. See you!",
        
        rating: 4.5
    },
        project: [ ],
        __v: 0
}]

export default class SearchTeamPage extends Component {

    // async componentDidMount() {
    //     const { category, keyword } = this.props.match.params
    //     await fetch(`https://team-up-server.herokuapp.com/search/${category}/${keyword}`)
    //         .then(response => response.json())
    //         .then(searchList => this.setState({searchList}));
    // }

    render() {
        const { keyword } = this.props.match.params
        console.log(searchList)
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
        console.log(id);
        const starLogo = "https://image.flaticon.com/icons/svg/291/291205.svg";
        const link = `/team/${id}`;
        return (
            <div style={{display: 'flex', marginBottom: 30}}>
                <div className="span-1-of-3">
                    {/* Four Profile pic */}
                    <img src={profile.picture[0]} style={profilePic} />
                    <img src={profile.picture[1]} style={profilePic} />
                    <img src={profile.picture[2]} style={profilePic} />
                    <img src={profile.picture[3]} style={profilePic} />
                </div>
                <div className="span-2-of-3" style={{marginLeft: 20}}>
                    <Link to={link}> <h4 style={{color: '#ffa801'}}><strong>{profile.fullName}</strong></h4></Link>
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
    width: 100,
    height: 100,
    borderRadius: '50%',
    margin: '5px 5px'
}