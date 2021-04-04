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
    const headerClass = this.props.user ? "sticky-top" : "fixed-top";
    return (
      <div className="my-header">
        <nav
          className={`navbar ${headerClass} navbar-expand-lg navbar-light bg-light`}
        >
          <Link to="/" className="navbar-brand">
            <img
              src={Logo}
              width="40"
              height="40"
              className="d-inline-block align-top mr-2"
              alt=""
            />
            Solace
          </Link>
          {this.props.user ? (
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
                  <li className="nav-item active mr-2">
                    <Link to="/home" className="nav-link">
                      Home <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item mr-2">
                    <Link to="/music" className="nav-link">
                      Vibe & Chill
                    </Link>
                  </li>
                  <li className="nav-item mr-2">
                    <a href="#postblog" className="nav-link">
                      Share
                    </a>
                  </li>
                  <li className="nav-item mr-2">
                    <a href="#blogs" className="nav-link">
                      Blogs
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
                <ul className="navbar-nav" style={{ marginLeft: "52em" }}>
                  <li className="nav-item mr-2">
                    <Link onClick={this.logout} className="nav-link logout">
                      <i className="fas fa-sign-out-alt mr-2 logout"></i>Logout
                    </Link>
                  </li>
                </ul>
              </div>{" "}
            </>
          ) : null}
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
