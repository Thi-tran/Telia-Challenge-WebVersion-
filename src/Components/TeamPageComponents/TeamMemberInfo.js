import React, { Component } from 'react'
import {Link} from 'react-router-dom';

const info = [{
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
        rating: 4.5,
        profileURL: "/freelancer/5d01cda2192f7700243d655c"
    },
    project: [ ],
    __v: 0
    },{
        _id: "5d01cda2192f7700243d655c",
        email: "Bill.Gates@gmail.com",
        password: "thi123",
        profile: {
            _id: "5d00db64faac9a46cc233a09",
            skillList: [
            {
                _id: "5d00db64faac9a46cc233a0d",
                skillName: "Branding"
            },
            {
                _id: "5d00db64faac9a46cc233a0c",
                skillName: "Logo"
            },
            {
                _id: "5d00db64faac9a46cc233a0b",
                skillName: "Website"
            },
            ],
            fullName: "Jenifer McKenny",
            location: "Seattle, California, USA",
            picture: "https://randomuser.me/api/portraits/women/94.jpg",
            title: "Designer",
            description: "Designer who loves cat and pink!",
            rating: 4.5,
            profileURL: "freelancer/5d01cda2192f7700243d655c"
        },
        project: [ ],
        __v: 0
    },{
        _id: "5d01cda2192f7700243d655c",
        email: "Bill.Gates@gmail.com",
        password: "thi123",
        profile: {
            _id: "5d00db64faac9a46cc233a09",
            skillList: [
            {
                _id: "5d00db64faac9a46cc233a0d",
                skillName: "React"
            },
            {
                _id: "5d00db64faac9a46cc233a0c",
                skillName: "VueJS"
            },
            {
                _id: "5d00db64faac9a46cc233a0b",
                skillName: "NextJS"
            },
            ],
            fullName: "Le Dean",
            location: "Seattle, California, USA",
            picture: "https://randomuser.me/api/portraits/men/26.jpg",
            title: "Frontend Developer",
            description: "A Developer that focuses on making things work and look clean",
            rating: 4.5,
            profileURL: "freelancer/5d01cda21dfdfd243d655c"
        },
        project: [ ],
        __v: 0
    },{
        _id: "5d01cda2192f7700243d655c",
        email: "Bill.Gates@gmail.com",
        password: "thi123",
        profile: {
            _id: "5d00db64faac9a46cc233a09",
            skillList: [
            {
                _id: "5d00db64faac9a46cc233a0d",
                skillName: "Backend Architecture"
            },
            {
                _id: "5d00db64faac9a46cc233a0c",
                skillName: "NodeJS"
            },
            {
                _id: "5d00db64faac9a46cc233a0b",
                skillName: "Java"
            },{
                _id: "5d00db64faac9a46cc233a0b",
                skillName: "SQL"
            },{
                _id: "5d00db64faac9a46cc233a0b",
                skillName: "PostgreSQL"
            },
            ],
            fullName: "Prashant Yadav",
            location: "Seattle, California, USA",
            picture: "https://randomuser.me/api/portraits/men/56.jpg",
            title: "Backend Developer",
            description: "Backend dev with over 5 years experience",
            rating: 4.5,
            profileURL: "freelancer/5d01cda2192f7700243d655c"
        },
        project: [ ],
        __v: 0
    }
]


export default class TeamMemberInfo extends Component {
    render() {
        return (
            <div>
                {info.map(item => 
                    <div key={item.profile._id} style={{display: 'flex', marginBottom: 30}}>
                        <div className="span-1-of-3">
                            <img src={item.profile.picture} style={profilePic} />
                        </div>
                        <div className="span-2-of-3" style={{marginLeft: 20}}>
                            <Link to={item.profile.profileURL}> <h4 style={{color: '#FFC048'}}>{item.profile.fullName}</h4></Link>
                            <h6 style={{fontStyle: 'bold'}}>{item.profile.title}</h6>
                            <div>{item.profile.description}</div>
                            <div>
                                <h5>Skills</h5>
                                <div>
                                    {item.profile.skillList.map(skill => <span key={skill._id} style={{marginRight: 5, backgroundColor: '#d2dae2', padding: '5px 5px', borderRadius: 5}}>{skill.skillName}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const profilePic = {
    width: 100,
    height: 100,
    borderRadius: '50%',
}