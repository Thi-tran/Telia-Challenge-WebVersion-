import React, { Component } from 'react'
import step1 from '../styles/stockImg/steps1.jpeg';
import step2 from '../styles/stockImg/steps2.jpeg';
import step3 from '../styles/stockImg/steps3.jpeg';

export default class HowItWork extends Component {
    render() {
        return (
            <div className="howItWork">
                <h2 className="mx-auto">HOW IT WORKS</h2>
                <div className="section-meals" id="meals">
                    <ul className="meals-showcase clearfix" style={{paddingLeft: 0, margin: '0 auto'}}>
                    </ul>
                </div>
                <div className="steps-container" style={{display: 'flex'}}>
                    <div className="col">
                        <img src={step1} alt="step-1" className="step-pic" />
                        <p className="step-text">Tilaa mustikoita netistä</p>
                    </div>
                    <div className="col">
                        <img src={step2} alt="step-1" className="step-pic" />
                        <p className="step-text">Rentoudu sillä välin kun mustikat <br/> tuodaan kotiisi 1 - 3 päivässä</p>
                    </div>
                    <div className="col">
                        <img src={step3} alt="step-1" className="step-pic" />
                        <p className="step-text">Nauti kesäisestä mausta <br/>  perheesi kanssa</p>
                    </div>
                </div>
            </div>
        )
    }
}
