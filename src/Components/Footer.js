import React, { Component } from 'react';

const Footer = () => (
    <div id="Footer" className="footer">
        <div class="wrapper">
            <div style={{display: 'flex'}}>
                <ul class="footer-nav">
                    <li><a href="#Home">Home</a></li>
                    <li><a href="#About">About</a></li>
                    <li><a href="#Contact">How-to</a></li>
                    <li><a href="#Signup">Sign up</a></li>
                </ul>
            </div>
        </div>        

        <div class="wrapper">
            <div style={{display: 'flex'}}>
                <ul class="footer-icon-list">
                    <li><a href="https://www.facebook.com/"><i name="logo-facebook" className="icon-facebook fab fa-facebook	"></i></a></li>
                    <li><a href="https://www.instagram.com/"><i name="logo-instagram" className="icon-insta fab fa-instagram	"></i></a></li>
                </ul>
            </div>
        </div>

        <div class="wrapper">
            <div class="footer-under" style={{display: 'flex'}}>
                <div class="footer-text text-white">©2019 by TeamUp Oy (Y-tunnus: 2759222-9)</div>
                <div class="footer-text text-white">All data is protected under GDPR</div>
            </div>
        </div>
    </div>
);


export default Footer;
