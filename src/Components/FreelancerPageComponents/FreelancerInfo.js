import React, { Component } from 'react'

export default class FreelancerInfo extends Component {
    render() {
        const {info} = this.props;
        return (
            <div style={{display: 'flex'}}>
                <div className="span-1-of-3" style={{width: '30%', textAlign: 'center', }}>
                    <div style={{marginBottom: 10}}>
                        <img src={info.image} alt="photo" style={{
                            width: 140,
                            height: 140,
                            borderRadius: '50%',
                        }} />                            
                    </div>

                    <div>
                        <button type="submit" className="btn btn-success" style={{marginRight: 5}}>Team Up!</button>
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
                        <strong>Education: </strong>
                        {info.education}
                    </div>
                    <div>
                        <strong>Comments: </strong>
                        <div>
                            {info.comment.map(item => 
                                <div key={item.name}>
                                    <span>
                                        "{item.comment}"
                                    </span> - {item.name}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>   
        )
    }
}
