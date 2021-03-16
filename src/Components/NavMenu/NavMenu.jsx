import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './navMenu.scss';


const NavMenu = ({ isAuthentificate }) => {
    const [navMenuShow, setNavMenuShow] = useState(false)
    const showHideNavMenu = (showOrHide) => {
        if(window.innerWidth > 992) {
            return;
        }
        setNavMenuShow(showOrHide);
    };
    return (
        <Navbar className="navMenu" expanded={navMenuShow}  expand="lg" bg="dark" variant="dark">
            <Navbar.Brand> 
                <Link onClick={() => showHideNavMenu(false)} className="navMenu-link" to="/"> To Do </Link>
            </Navbar.Brand>
            <Navbar.Toggle onClick={() => showHideNavMenu(!navMenuShow)} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink activeClassName="navMenu-active-link" className="navMenu-link" onClick={() => showHideNavMenu(false)} to="/contact"> Contact Us </NavLink>
                    <NavLink activeClassName="navMenu-active-link" className="navMenu-link" onClick={() => showHideNavMenu(false)} to="/about"> About </NavLink>
                    {
                        isAuthentificate ? 
                            <NavLink activeClassName="navMenu-active-link" className="navMenu-link" onClick={() => showHideNavMenu(false)} to="/signin"> Sign Out </NavLink>
                            :
                            <>        
                            <NavLink activeClassName="navMenu-active-link" className="navMenu-link" onClick={() => showHideNavMenu(false)} to="/signin"> Sign in </NavLink>
                            <NavLink activeClassName="navMenu-active-link" className="navMenu-link" onClick={() => showHideNavMenu(false)} to="/signup"> Sign Up </NavLink>
                            </> 
                        
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

const mapStateToProps = (store) => {
    return {
        isAuthentificate: store.isAuthentificate
    }
}


export default connect(mapStateToProps)(NavMenu);