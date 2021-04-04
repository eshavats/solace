import React from "react";
import "./Header.css";
import Logo from "./img/logo2.PNG";

class HeaderAuth extends React.Component {
  render() {
    return (
      <div className="my-header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img
              src={Logo}
              width="40"
              height="40"
              className="d-inline-block align-top mr-2"
              alt=""
            />
            Solace
          </a>
        </nav>
      </div>
    );
  }
}

export default HeaderAuth;
