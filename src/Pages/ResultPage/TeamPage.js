import React, { Component } from 'react'
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import TeamMemberInfo from '../../Components/TeamPageComponents/TeamMemberInfo';
import TeamProject from '../../Components/TeamPageComponents/TeamProject';
import TeamInfo from '../../Components/TeamPageComponents/TeamInfo';

const info = {    
    name: "International Adventure",
    title: "Marketer/ Communication Manager + Designer + Frontend Developer + Backend Developer",
    picture: ["https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg", "https://randomuser.me/api/portraits/women/94.jpg", "https://randomuser.me/api/portraits/men/26.jpg", "https://randomuser.me/api/portraits/men/56.jpg" ],
    language: [
        "English,", "Spanish"
    ],
    experience: "Adventure team has been working together for over 3 years, overcoming multiple projects",
    education: "Harvard College",
    skill: [
        "Fullstack App Development,", "AR / VR", "Copywrite, Content Marketing", "Service Design"
    ],
    comment: [
        {
            comment: "Very dynamic team with each person speclized in their own field. I personally like the Project Manager due to his competitiveness and wise",
            name: "Richard Brandson"
        },
        {
            comment: "When it comes to project development, Bill is a reliable guy that you can trust that he will get it done",
            name: "Warren Buffet"
        }
    ],
    projects: [
        {
            name: "Uncode - BTS new album releases",
            picture: "https://colorlib.com/wp/wp-content/uploads/sites/2/uncode-music-wordpress-website-template.jpg"
        },        {
            name: "Booking system for Music Concert",
            picture: "https://colorlib.com/wp/wp-content/uploads/sites/2/slide-music-wordpress-theme.jpg"
        },{
            name: "FinanceBuddy - Get Your Loan Now",
            picture: "https://colorlib.com/wp/wp-content/uploads/sites/2/credit-free-template.jpg"
        },        {
            name: "Cryto Management Website",
            picture: "https://colorlib.com/wp/wp-content/uploads/sites/2/cryptos-free-template.jpg"
        }
    ]
};


const styles = {
    root: {
      },
};

class TeamPage extends Component {
    
state = {
    info: info
}

// async componentDidMount() {
//     const { id } = this.props.match.params;
//     await fetch(`https://team-up-server.herokuapp.com/freelancer/${id}`)
//     .then(response => response.json())
//     .then(info => this.setState({info}));
// }   

render() {
    const {info} = this.state;
    const { classes } = this.props;

    return (
        <div>
            <Navbar />
            
            <div style={{...container, marginTop: 30}}>
                <Paper className={classes.root} style={{margin: '10px 20px', padding: '20px 30px', width: 800}}>
                    <TeamInfo info={info}/>      
                </Paper>
            </div>

            <div style={container}>
                <Paper className={classes.root} style={{margin: '10px 20px', padding: '20px 30px', width: 800}}>
                    <TeamMemberInfo info={info}/>      
                </Paper>
            </div>

            <div style={container}>
                <Paper className={classes.root} style={{margin: '10px 20px', padding: '20px 30px', width: 800}}>
                    <TeamProject info={info}/>  
                </Paper>
            </div>
            {info.projects && info.projects.map((item,index) => (
                <div class="lightbox-target" id={index}>
                    <img src={item.picture}/>
                    <a class="lightbox-close" href="#"></a>
                </div>
            ))}
            <Footer />
        </div>

    )
}
}

const container = {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
}
TeamPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeamPage);
