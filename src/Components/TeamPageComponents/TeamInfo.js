import React, { Component } from 'react'

export default class TeamInfo extends Component {
    render (){
        const {info} = this.props;
        return (
            <div style={{display: 'flex'}}>
                <div className="span-1-of-3" style={{width: '30%', textAlign: 'center', }}>
                    <div style={{marginBottom: 10}}>
                        <img src={info.picture[0]} style={profilePic} />
                        <img src={info.picture[1]} style={profilePic} />
                        <img src={info.picture[2]} style={profilePic} />
                        <img src={info.picture[3]} style={profilePic} />
                    </div>
    
                    <div>
                        <button type="submit" className="btn btn-success" style={{marginRight: 5}}>Hire Team!</button>
                        <button type="submit" className="btn" style={{marginLeft: 5, backgroundColor: '#ffda79'}}>Message</button>
                    </div>
                </div>
                <div className="span-2-of-3" style={{paddingLeft: 20, width: '70%', textAlign: 'left'}}>
                        <h4 style={{marginBottom: 0}}>{info.name}</h4>
                        <h6>{info.title}</h6>
                    <div>
                        <strong>Language:</strong> {info.language.map(item => <span key={item}>{item} </span>)}
                    </div>
                    <div>
                        <strong>Skill:</strong> {info.skill.map(item => <span key={item}>{item} </span>)}
                    </div>
    
                    <div>
                        <strong>Experience: </strong>
                        {info.experience}
                    </div>
                    <div>
                        <strong>Comments: </strong>
                        <div>
                            {info.comment.map(item => 
                                <div key={item.name}>
                                    <span>
                                        "{item.comment}" - 
                                    </span>&nbsp;
                                    <span style={{fontStyle: 'italic'}}>
                                     {item.name}
                                    </span>
                                </div>
                            )}
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