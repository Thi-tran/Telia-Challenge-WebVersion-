import React, { Component } from 'react'
import Slider from "react-slick";

export default class TeamProject extends Component {
    render() {
        const {info} = this.props;
        var settings = {
            dots: true,
            infinite: true,
            lazyLoad: true,
            speed: 500,      
            slidesToShow: 2,
            slidesToScroll: 1,    
            textDecoration:'none'    
          };
    
        // # system
        const hashtag = ["#0","#1","#2","#3","#4"]
        return (
            <div>
                <h4>{info.name}'s projects</h4>
                <div style={slide}>
                    <Slider {...settings}>
                        {info.projects && info.projects.map((item, index) => (
                            <div key={item.name}>
                                <h6><strong>{item.name}</strong></h6>
                                <a href={hashtag[index]}>
                                    <img src={item.picture} alt="project-photo" 
                                        style={{width: 200, margin: '0 auto'}}
                                    />
                                </a> 

                                {/* <img src={item.picture} alt="project-photo" 
                                    style={{width: 200, margin: '0 auto'}}
                                /> */}
                            </div>
                        ))}
                    </Slider>
                </div>
                {/* click to zooom image */}


            </div>
        )
    }
}


const slide = {

    alignItems: 'center',
    margin: '0 auto',
    paddingBottom: 20,
};