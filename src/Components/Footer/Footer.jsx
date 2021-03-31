import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => { 
    return(
        <div className="footer">
            <div className="footer-first">
                <ul>
                    <li><Link to="/">About Us</Link></li>
                    <li><Link to="/">Contact Us</Link></li>
                </ul>
            </div>
            <div className="footer-second">
                <ul>
                    <li><Link target to="facebook.com">Facebook</Link></li>
                    <li><Link to="linkedin.com">Linkedin</Link></li>
                    <li><Link to="github.com">Github</Link></li>
                    <li><Link to="vk.com">VK</Link></li>
                </ul>
            </div>
        </div>
    )
};

export default Footer;