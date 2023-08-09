import "semantic-ui-css/semantic.min.css";
import React, { useState } from "react";
import { Link, NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../../Managers/UserManager";
import { Menu, Dropdown } from "semantic-ui-react";
import "./Header.css";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  // const [activeItem, setActiveItem] = useState("home"); // Use state hook

  // const handleItemClick = (e, { name }) => setActiveItem(name); // Update active item

  return (
    <>
      <Menu secondary id="navbar">
        {isLoggedIn && 
          <>
            <Menu.Item
              as={RRNavLink}
              to="/"
              name="home"
              id="menuItem"
            >
              Home
            </Menu.Item>
            <Dropdown item text="Trips" id="menuItem">
              <Dropdown.Menu>
                <Dropdown.Item
                  as={RRNavLink}
                  to="/createatrip"
                  text="Plan My Trip"
                />
                <Dropdown.Item as={RRNavLink} to="/mytrips" text="My Trips" />
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown item text="Parks" id="menuItem">
              <Dropdown.Menu>
                <Dropdown.Item
                  as={RRNavLink}
                  to="/parks"
                  text="WV State Parks"
                />
                <Dropdown.Item
                  as={RRNavLink}
                  to="/stays"
                  text="Places to Stay"
                />
                <Dropdown.Item
                  as={RRNavLink}
                  to="/trails"
                  text="Trails to Hike"
                />
                <Dropdown.Item
                  as={RRNavLink}
                  to="/historicalsites"
                  text="History to Learn"
                />
                <Dropdown.Item
                  as={RRNavLink}
                  to="/activities"
                  text="Things to Do"
                />
                <Dropdown.Item
                  as={RRNavLink}
                  to="/waterfalls"
                  text="Waterfalls to Wander"
                />
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown item text="Reviews" id="menuItem">
              <Dropdown.Menu>
                <Dropdown.Item
                  as={RRNavLink}
                  to="/myreviews"
                  text="My Reviews"
                />
                <Dropdown.Item
                  as={RRNavLink}
                  to="/allreviews"
                  text="All Reviews"
                />
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown item text="About" id="menuItem">
              <Dropdown.Menu>
                <Dropdown.Item as={RRNavLink} to="/about" text="About" />
                <Dropdown.Item
                  as={RRNavLink}
                  to="/frequentlyaskedquestions"
                  text="FAQs"
                />
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item
              as={RRNavLink}
              to="/myprofile"
              name="My Profile"
              id="menuItem"
            >
              My Profile
            </Menu.Item>
            </>
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
        {!isLoggedIn && (
          <>
            <Menu.Item
              as={RRNavLink}
              to="/"
              name="home"
            >
              Home
            </Menu.Item>
            <Menu.Item
              as={RRNavLink}
              to="/parks"
              name="parks"
            >
              WV State Parks
            </Menu.Item>
            <Menu.Item
              as={RRNavLink}
              to="/about"
              name="about"
            >
              About
            </Menu.Item>
            <Menu.Item
              as={RRNavLink}
              to="/login"
              name="login"
            >
              Login
            </Menu.Item>
            {/* <Menu.Item>
                  <Link tag={RRNavLink} to="/register">Register</Link>
                </Menu.Item> */}
          </>
        )}
      </Menu>
    </>
  );
}
