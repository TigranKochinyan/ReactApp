import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { signout, changeTheme } from './../../store/actions';

import './navMenu.scss';


const NavMenu = ({ isAuthentificate, signout, user, changeTheme, theme }) => {
    const [navMenuShow, setNavMenuShow] = useState(false)
    const showHideNavMenu = (showOrHide) => {
        if(window.innerWidth > 992) {
            return;
        }
        setNavMenuShow(showOrHide);
    };
    const changeThemeAndCloseMenu = () => {
        changeTheme();
        showHideNavMenu(false);
    }
    return (
        <Navbar className="navMenu" expanded={navMenuShow}  expand="lg" bg="dark" variant="dark">
            <Navbar.Brand> 
                <Link onClick={() => showHideNavMenu(false)} className="navMenu-link" to="/"> To Do </Link>
                <span>{ user }</span>
            </Navbar.Brand>
            <Navbar.Toggle onClick={() => showHideNavMenu(!navMenuShow)} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto navMenu-links">
                    <NavLink activeClassName="navMenu-active-link" className="navMenu-link" onClick={() => showHideNavMenu(false)} to="/contact"> Contact Us </NavLink>
                    <NavLink activeClassName="navMenu-active-link" className="navMenu-link" onClick={() => showHideNavMenu(false)} to="/about"> About </NavLink>
                    {
                        isAuthentificate ? 
                            <button className="navMenu-link-logout" onClick={() => {showHideNavMenu(false);signout()}}>Sign out</button>
                            :
                            <>        
                            <NavLink activeClassName="navMenu-active-link" className="navMenu-link" onClick={() => showHideNavMenu(false)} to="/signin"> Sign in </NavLink>
                            <NavLink activeClassName="navMenu-active-link" className="navMenu-link" onClick={() => showHideNavMenu(false)} to="/signup"> Sign Up </NavLink>
                            </>   
                    }
                    {
                        theme === 'light' ? 
                        <FontAwesomeIcon className="navMenu-theme-icon" onClick={changeThemeAndCloseMenu} icon={ faMoon } /> 
                        :
                        <FontAwesomeIcon className="navMenu-theme-icon" onClick={changeThemeAndCloseMenu} icon={ faSun } />
                    
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

const mapStateToProps = (store) => {
    return {
        isAuthentificate: store.isAuthentificate,
        user: store.user,
        theme: store.theme
    }
};

const mapDispatchToProps = {
    signout,
    changeTheme
}


export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);