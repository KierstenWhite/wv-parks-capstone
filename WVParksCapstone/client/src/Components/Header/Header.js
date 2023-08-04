import React, { useState } from 'react';
import { Link, NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../../Managers/UserManager';
import 'semantic-ui-css/semantic.min.css';
import { Dropdown, Menu } from 'semantic-ui-react';
import "./Header.css"


export default function Header({isLoggedIn, setIsLoggedIn}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Menu pointing secondary>
        {/* <NavbarBrand tag={RRNavLink} to="/">Tabloid</NavbarBrand> */}
        {/* <NavbarToggler onClick={toggle} /> */}
        {/* <Collapse isOpen={isOpen} navbar> */}
          
            { /* When isLoggedIn === true, we will render the Home link */ }
            {isLoggedIn &&
             <div>
              <Menu.Item>
                <Link tag={RRNavLink} to="/">Home</Link>
              </Menu.Item>
              <Menu.Item>
                <Link tag={RRNavLink} to="/trips">Trips</Link>
              </Menu.Item>
              <Menu.Item>
                <Link tag={RRNavLink} to="/parks">Parks</Link>
              </Menu.Item>
              <Menu.Item>
                <Link tag={RRNavLink} to="/reviews">Reviews</Link>
              </Menu.Item>
              <Menu.Item>
                <Link tag={RRNavLink} to="/about">About</Link>
              </Menu.Item>
              <Menu.Item position="right">
                <Link tag={RRNavLink} to="/myprofile">Profile</Link>
              </Menu.Item>
            </div>
            }
        
          
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
        
        {/* </Collapse>
      </Navbar> */}
    </div>
  );
}