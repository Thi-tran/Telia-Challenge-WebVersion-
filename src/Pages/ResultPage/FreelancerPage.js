import React, { Component } from 'react'
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import FreelancerInfo from '../../Components/FreelancerPageComponents/FreelancerInfo';
import FreelancerProject from '../../Components/FreelancerPageComponents/FreelancerProject';

const info = {
    name: "Bil Gates",
    title: "Project Manager",
    image: "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg",
    language: [
        "English,", "Spanish"
    ],
    experience: "15 years at Microsoft, 5 years doing charity marketing",
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
    
class FreelancerPage extends Component {
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
                        <FreelancerInfo info={info}/>      
                    </Paper>


                </div>

                <div style={container}>
                    <Paper className={classes.root} style={{margin: '10px 20px', padding: '20px 30px', width: 800}}>
                        <FreelancerProject info={info}/>  
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
FreelancerPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(FreelancerPage);
