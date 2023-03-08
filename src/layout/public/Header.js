import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from './menu/Menu';
import { checkActive } from '../../helper/Check';
import Login from '../../view/authentication/login/Login';

function Header() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (location.pathname === '/login') {
      setShow(true);
    }
  }, [location.pathname]);

  return (
    <header id="public">
      <Navbar collapseOnSelect expand="md" className="navbar px-4">
        <Link to="/" className="logo-title">
          Q Online
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {Menu.map((item) => (
              <Link to={item.pathname} className={`nav-link ${checkActive(location, item.pathname) ? 'nav-active' : ''}`} key={item.id}>
                {item.title}
              </Link>
            ))}
            <Link
              to="#"
              className={`nav-link ${checkActive(location, '/login') ? 'nav-active' : ''}`}
              onClick={() => {
                setShow(!show);
              }}
            >
              เข้าสู่ระบบ
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Login show={show} setShow={setShow} />
    </header>
  );
}

export default Header;
