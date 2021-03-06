import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Header.css";
import Logo from "./img/logo2.PNG";
import { delUser } from "../../redux/actions";
import history from "../history";

class Header extends React.Component {
  logout = () => {
    this.props.delUser();

    history.push("/login");
  };

  render() {
    const headerClass = "sticky-top";
    return (
      <div className="my-header">
        <nav
          className={`navbar ${headerClass} navbar-expand-lg navbar-light bg-light`}
        >
          <a href="/" className="navbar-brand">
            <img
              src={Logo}
              width="40"
              height="40"
              className="d-inline-block align-top mr-2"
              alt="solace-logo"
            />
            Solace
          </a>
          
            <>
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
                  <li className="nav-item mr-2">
                    <a href="/home" className="nav-link">
                      Home
                    </a>
                  </li>
                  <li className="nav-item mr-2">
                    <a href="/music" className="nav-link">
                      Vibe & Chill
                    </a>
                  </li>
                  <li className="nav-item mr-2">
                    <a href="/create" className="nav-link">
                      Create
                    </a>
                  </li>
                  <li className="nav-item mr-2">
                  <a href="/blogs" className="nav-link">
                      Blogs
                    </a>
                  </li>
                  <li className="nav-item mr-2">
                    <a href="/about" className="nav-link">
                      About
                    </a>
                  </li>
                  <li className="nav-item mr-2 dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Covid-19
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <a
                        className="dropdown-item"
                        href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
                      >
                        Advice
                      </a>
                      <a
                        className="dropdown-item"
                        href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/question-and-answers-hub"
                      >
                        Q & A
                      </a>
                      <a
                        className="dropdown-item"
                        href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/covid-19-vaccines"
                      >
                        Vaccines
                      </a>
                    </div>
                  </li>
                </ul>
                {this.props.user ? <ul className="navbar-nav" style={{ marginLeft: "52em" }}>
                  <li className="nav-item mr-2">
                    <Link onClick={this.logout} className="nav-link logout">
                      <i className="fas fa-sign-out-alt mr-2 logout"></i>Logout
                    </Link>
                  </li>
                </ul> : <ul className="navbar-nav" style={{ marginLeft: "50em" }}>
                  <li className="nav-item mr-2">
                    <a href="/login" className="nav-link logout">
                      <i className="fas fa-sign-in-alt mr-2 login"></i>Login
                    </a>
                  </li>
                </ul> }
                

              </div>{" "}
            </>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.users };
};

const mapDispatchToProps = (dispatch) => ({
  delUser: () => dispatch(delUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
