import React, { Component } from 'react'
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
import {Link} from 'react-router-dom';
const category = "Project"
const searchList = [{
    email: "Bill.Gates@gmail.com",
    password: "thi123",
    _id: "5d00db64faac9a46cc93a09",
    profile: {
    _id: "5d00db64faac9a46cc93a09",
    skillList: [
        {
            _id: "5d00db64faac9a46cc233a0d",
            skillName: "React"
        },
        {
            _id: "5d00db64faac9a46cc233a0c",
            skillName: "NodeJS"
        },
        {
            _id: "5d00db64faac9a46cc233a0b",
            skillName: "AWS"
        },
    ],
        fullName: "Web Application Using AI For Health Being",

        picture: "https://cdn-images-1.medium.com/max/1600/1*ZQup-TWEAJOSMJhXPqu6jQ.jpeg",

        title: "A project to help keep track of daily activities of the elderly",

        description: "We are looking for Web Designer, Frontend Develop who has at least 2 years experience. Our project is challenging but fun and exciting as well! Your work will help other people life",
        
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
            skillName: "Web Development"
        },
        {
            _id: "5d00db64faac9a46cc233a0c",
            skillName: "AI / Machine Learning"
        },
        {
            _id: "5d00db64faac9a46cc233a0b",
            skillName: "Python / Scala"
        },
    ],
        fullName: "AI for invoice ",

        picture: "http://www.allerin.com/wp-blog/wp-content/uploads/2017/03/6-ways-AI-is-impacting-the-finance-industry.jpg",

        title: "Using AI for invoicing and payment",

        description: "Hello! We are Smartly Oy. We are looking for Web Designer and Backend Developer to join the team. You will work with the latest technologies and ready to Change the World! Read more under the Instruction to find out if you are a good match for us!"
        
    },
        project: [ ],
        __v: 0
}]

export default class SearchProjectPage extends Component {
    
    render() {
        console.log(this.props.match.params);
        const { keyword } = this.props.match.params
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
        const link = `/project/${id}`;
        return (
            <div style={{display: 'flex', marginBottom: 30}}>
                <div className="span-1-of-3">
                    <img src={profile.picture} style={profilePic} />
                </div>
                <div className="span-2-of-3" style={{marginLeft: 20}}>
                    <Link to={link}> <h4 style={{color: '#FFC048'}}>{profile.fullName}</h4></Link>
                    <h6 style={{fontStyle: 'bold'}}>{profile.title}</h6>

                    <div>{profile.description}</div>
                    <div>
                        <h5>Skills needed</h5>
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
}