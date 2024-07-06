import React, { useState } from 'react';
import {
  Container, Typography, Button, Modal, Box, TextField, Grid, AppBar, Toolbar, IconButton, Menu,
  MenuItem as DropdownMenuItem
} from '@mui/material';
import axios from 'axios';
import './App.css';
import heroImage from './assets/background.png';
import howToReferImage from './assets/backgr1.png';
import referralBenefitsImage from './assets/referalbene.png';
import thirdimg from './assets/frequent.png';
import fourth from './assets/div.cta-grad.png';
import lastest from './assets/Backgroundlast.png';
import benefits from './assets/accredainnew.png';

const courses = [
  "Data Science & AI",
  "Product Management",
  "Business Analytics",
  "Digital Transformation",
  "Business Management",
  "Project Management",
  "Strategy & Leadership",
  "Senior Management",
  "Fintech"
];

const App = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [form, setForm] = useState({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeEmail: '',
    course: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/referrals', form);
      console.log('Referral submitted:', response.data);
      setOpen(false);
    } catch (error) {
      console.error('Error submitting referral:', error);
      alert('There was an error submitting your referral. Please try again.');
    }
  };
  

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scrollToReferral = () => {
    document.getElementById('how-to-refer-section').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBenefits = () => {
    document.getElementById('referral-benefits-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="contact-expert">
        <Typography variant="h6">
          Navigate your ideal career path with tailored expert advice
        </Typography>
        <Typography variant="h6" component="a" href="#" className="contact-link">
          Contact Expert
        </Typography>
      </div>

      <AppBar position="static" className="navbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => window.location.href = 'https://accredian.com/'}>
            <img src={benefits} alt="Logo" style={{ width: '70px', height: 'auto' }} />
          </IconButton>
          <Button style={{ color: 'black', backgroundColor: '#1A73E8' }} onClick={handleMenu}>Courses</Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {courses.map((course, index) => (
              <DropdownMenuItem key={index} onClick={handleClose}>{course}</DropdownMenuItem>
            ))}
          </Menu>
          <div className="navbar-right">
            <Button style={{ color: 'black', marginRight: '20px' }}>Refer and Earn</Button>
            <Button style={{ color: 'black', marginRight: '20px' }}>Resources</Button>
            <Button style={{ color: 'black', marginRight: '20px' }}>About Us</Button>
            <Button style={{ color: 'black', backgroundColor: '#94A3B833', marginRight: '20px' }} href="https://accredian.com/login">Login</Button>
            <Button variant="contained" style={{ backgroundColor: '#1A73E8' }} href="https://trial.accredian.com/">Try for Free</Button>
          </div>
        </Toolbar>
      </AppBar>

      <AppBar position="static" className="small-navbar">
        <Toolbar>
          <Button color="inherit" onClick={scrollToReferral}>Refer</Button>
          <Button color="inherit" onClick={scrollToBenefits}>Benefit</Button>
          <Button color="inherit">FAQs</Button>
          <Button color="inherit">Support</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" className="hero-section">
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6} className="hero-image">
            <img src={heroImage} alt="Hero" className="hero-img" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" className="hero-title">
              Let’s Learn & Earn
            </Typography>
            <Typography className="hero-subtitle">
              Get a chance to win up-to <span className="highlight-text">Rs. 15,000</span>
            </Typography>
            <Button variant="contained" color="primary" className="hero-button" onClick={() => setOpen(true)}>
              Refer Now
            </Button>
          </Grid>
        </Grid>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={{ ...style, width: 500 }}>
            <Typography variant="h6" gutterBottom>
              Refer a Course
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Referrer Name"
                name="referrerName"
                value={form.referrerName}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Referrer Email"
                name="referrerEmail"
                type="email"
                value={form.referrerEmail}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Referee Name"
                name="refereeName"
                value={form.refereeName}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Referee Email"
                name="refereeEmail"
                type="email"
                value={form.refereeEmail}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                select
                label="Course Interested"
                name="course"
                value={form.course}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              >
                {courses.map((course, index) => (
                  <DropdownMenuItem key={index} value={course}>
                    {course}
                  </DropdownMenuItem>
                ))}
              </TextField>
              <TextField
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      </Container>

      <div id="how-to-refer-section" className="how-to-refer-section">
        <Typography variant="h4" className="how-to-refer-title">
          How Do I <span className="highlight-text">Refer?</span>
        </Typography>
        <img src={howToReferImage} alt="How to Refer" className="how-to-refer-img" />
        <Button variant="contained" color="primary" className="hero-button" onClick={() => setOpen(true)}>
          Refer Now
        </Button>
      </div>

      <div id="referral-benefits-section" className="referral-benefits-section">
        <Typography variant="h4" className="referral-benefits-title">
          What are the <span className="highlight-text">Referral Benefits?</span>
        </Typography>
        <img src={referralBenefitsImage} alt="Referral Benefits" className="referral-benefits-img" />
        <Button variant="contained" color="primary" className="hero-button" onClick={() => setOpen(true)}>
          Refer Now
        </Button>
      </div>

      <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '100px' }}>
        <Typography variant="h4">
          Frequently Asked <span style={{ color: '#1A73E8' }}>Questions</span>
        </Typography>
      </Container>
      <div style={{ marginTop: '80px' }}>
        <img src={thirdimg} alt="Referral Benefits" className="frequent-img" />
      </div>
      <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '100px' }}>
        <Typography variant="h4">
          Terms and <span style={{ color: '#1A73E8' }}>Conditions</span>
        </Typography>
      </Container>
      <div style={{ marginTop: '80px' }}>
        <img src={fourth} alt="Terms and Conditions" className="frequent-img" />
      </div>
      <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '100px' }}>
        <Typography variant="h4">
          Terms and <span style={{ color: '#1A73E8' }}>Conditions</span>
        </Typography>
      </Container>
      <div style={{ marginTop: '80px' }}>
        <img src={lastest} alt="Terms and Conditions" className="frequent-img" />
      </div>
    </>
  );
}



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default App;
