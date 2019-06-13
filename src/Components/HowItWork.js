import React, { Component } from 'react'
import step1 from '../styles/stockImg/steps1.jpeg';
import step2 from '../styles/stockImg/steps2.jpeg';
import step3 from '../styles/stockImg/steps3.jpeg';

export default class HowItWork extends Component {
    render() {
        const howItWork = require('../assets/howItWork.png');
        return (
            <div className="howItWork" style={{textAlign: 'center'}}>
                <div>
                    <img src={howItWork} />
                </div>
            </div>
        )
    }
}
