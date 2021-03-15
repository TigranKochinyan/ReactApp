import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './navMenu.scss';

const NavMenu = () => {
    const [navMenuShow, setNavMenuShow] = useState(false)
    const showHideNavMenu = () => {
        if(window.innerWidth > 992) {
            return;
        }
        setNavMenuShow(!navMenuShow);
    };
    return (
        <Navbar className="navMenu" expanded={navMenuShow}  expand="lg" bg="dark" variant="dark">
            <Navbar.Brand> 
                <Link onClick={showHideNavMenu} className="navMenu-link" to="/"> To Do </Link>
            </Navbar.Brand>
            <Navbar.Toggle onClick={showHideNavMenu} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink activeClassName="navMenu-active-link" className="navMenu-link" onClick={showHideNavMenu} to="/contact"> Contact Us </NavLink>
                    <NavLink activeClassName="navMenu-active-link" className="navMenu-link" onClick={showHideNavMenu} to="/about"> About </NavLink>
                    <NavLink activeClassName="navMenu-active-link" className="navMenu-link" onClick={showHideNavMenu} to="/signin"> Sign in </NavLink>
                    <NavLink activeClassName="navMenu-active-link" className="navMenu-link" onClick={showHideNavMenu} to="/signup"> Sign Up </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavMenu;