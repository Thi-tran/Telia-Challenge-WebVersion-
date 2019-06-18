import React, { Component } from 'react'
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import ProjectInfo from '../../Components/ProjectPageComponents/ProjectInfo';

const info = {
    name: "Web Application Using AI For Health Being",
    title: "A project to help keep track of daily activities of the elderly",
    image: "https://cdn-images-1.medium.com/max/1600/1*ZQup-TWEAJOSMJhXPqu6jQ.jpeg",
    language: [
        "English,", "Spanish"
    ],
    description: "We are great at what we do, and everything we do, we do with a huge heart. Our brave developers are skilled professionals with a humble mind, building a better tomorrow as their main priority. Our Maker spirit is high as the sky and free of hierarchies and unnecessary stiffness. If you don't know how to do something, there is always someone to help you out. We are a stable expert organisation with a hint of that famous IT hype. We are looking for Web Designer, Frontend Develop who has at least 2 years experience. Our project is challenging but fun and exciting as well! Your work will help other people life",
    education: "Harvard College",
    connection: {
        linkedin: "https://www.linkedin.com/in/williamhgates/"
    }, 
    skill: [
        "Marketing,", "Graphic Designer"
    ],
    comment: [
        {
            comment: "The most energetic and cute colleague.",
            name: "Rileen White"
        },
        {
            comment: "When it comes to project development, Bill is a reliable guy that you can trust that he will get it done",
            name: "Warren Buffet"
        }
    ],
    projects: [
        {
            name: "Windows XP",
            picture: "https://upload.wikimedia.org/wikipedia/en/6/64/Windows_XP_Luna.png"
        },        {
            name: "Microsoft Excel",
            picture: "https://upload.wikimedia.org/wikipedia/en/9/94/Microsoft_Excel.png"
        },{
            name: "Windows XP",
            picture: "https://upload.wikimedia.org/wikipedia/en/6/64/Windows_XP_Luna.png"
        },        {
            name: "Microsoft Excel",
            picture: "https://upload.wikimedia.org/wikipedia/en/9/94/Microsoft_Excel.png"
        }
    ]
};

const styles = {
    root: {
      },
};

class ProjectPage extends Component {
    
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
            
            <div style={container}>
                <Paper className={classes.root} style={{margin: '10px 20px', padding: '20px 30px', width: 800}}>
                    <ProjectInfo info={info}/>      
                </Paper>
            </div>
            <Footer />
        </div>

    )
}
}

const container = {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    height: '80vh'
}
ProjectPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectPage);
