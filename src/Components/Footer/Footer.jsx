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
                    <li><a target="_blank" rel="noreferrer" href="https://www.facebook.com/tigran.qochinyan">Facebook</a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/tigran-kochinyan-146b7820a">Linkedin</a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://github.com/TigranKochinyan">Github</a></li>
                    <li><a target="_blank" rel="noreferrer" href="https://vk.com/id148284421">VK</a></li>
                </ul>
            </div>
        </div>
    )
};

export default Footer;