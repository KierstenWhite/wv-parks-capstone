import React, { useState } from 'react';
import { Link, NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../../Managers/UserManager';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavLink
// } from 'reactstrap';
import { Menu } from 'semantic-ui-react';

export default function Header({isLoggedIn, setIsLoggedIn}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Menu>
        {/* <NavbarBrand tag={RRNavLink} to="/">Tabloid</NavbarBrand> */}
        {/* <NavbarToggler onClick={toggle} /> */}
        {/* <Collapse isOpen={isOpen} navbar> */}
          <Menu>
            { /* When isLoggedIn === true, we will render the Home link */ }
            {isLoggedIn &&
             <div style={{display: 'flex'}}>
              <Menu.Item>
                <Link tag={RRNavLink} to="/">Home</Link>
              </Menu.Item>
            </div>
            }
          </Menu>
          <Menu>
            {isLoggedIn &&
              <>
                <Menu.Item>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={() => {
                      logout()
                      setIsLoggedIn(false)
                    }}>Logout</a>
                </Menu.Item>
              </>
            }
            {!isLoggedIn &&
              <>
                <Menu.Item>
                  <Link tag={RRNavLink} to="/login">Login</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link tag={RRNavLink} to="/register">Register</Link>
                </Menu.Item>
              </>
            }
          </Menu>
          </Menu>
        {/* </Collapse>
      </Navbar> */}
    </div>
  );
}