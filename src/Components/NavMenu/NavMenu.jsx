import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navMenu.scss';

const NavMenu = () => {
    return (
        <Navbar className="navMenu" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand> 
                <Link to="/"> To Do </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Link className="navMenu-link" to="/contact"> Contact Us </Link>
                    <Link className="navMenu-link" to="/about"> About </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavMenu;