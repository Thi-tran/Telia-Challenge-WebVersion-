import React, { Component } from 'react'

export default class ProjectInfo extends Component {
    render() {
        const {info} = this.props;
        return (
            <div style={{display: 'flex'}}>
                <div className="span-1-of-3" style={{width: '30%', textAlign: 'center', }}>
                    <div style={{marginBottom: 10}}>
                        <img src={info.image} alt="photo" style={{
                            width: 180,
                            height: 180,
                        }} />                            
                    </div>

                    <div>
                        <button type="submit" className="btn btn-success" style={{marginRight: 5}}>Join Project</button>
                        <button type="submit" className="btn" style={{marginLeft: 5, backgroundColor: '#ffda79'}}>Message</button>
                    </div>
                </div>
                <div className="span-2-of-3" style={{paddingLeft: 20, width: '70%', textAlign: 'left'}}>
                        <h4 style={{marginBottom: 0}}>{info.name}</h4>
                        <h6>{info.title}</h6>
                    <div>
                        <strong>Project Description: </strong>
                        {info.description}
                    </div>

                </div>
            </div>   
        )
    }
}
