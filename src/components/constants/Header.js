import React from "react";
import "./Header.css";
import Logo from "./img/logo.PNG";

class Header extends React.Component {
  render() {
    return (
      <div className="my-header">
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img
              src={Logo}
              width="40"
              height="40"
              className="d-inline-block align-top mr-2"
              alt=""
            />
            Distress
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active mr-2">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item mr-2">
                <a className="nav-link" href="#">
                  Music
                </a>
              </li>
              <li className="nav-item mr-2">
                <a className="nav-link" href="#">
                  Chat
                </a>
              </li>
              <li className="nav-item mr-2 dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Covid-19
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
