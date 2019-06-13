import React, { Component } from 'react'

export default class SearchItem extends Component {
    render() {
        const {profile} = this.props.item;
        console.log(profile);
        const starLogo = "https://image.flaticon.com/icons/svg/291/291205.svg";
        return (
            <div style={{display: 'flex', marginBottom: 30}}>
                <div className="span-1-of-3">
                    <img src={profile.picture} style={profilePic} />
                </div>
                <div className="span-2-of-3" style={{marginLeft: 20}}>
                    <h4 style={{color: '#FFC048'}}>{profile.fullName}</h4>
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