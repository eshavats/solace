import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { message } from "antd";

import "./Register.css";
import { setUser } from "../../redux/actions";
import history from "../history";
import CoronaImg from "./img/corona1.gif";

class Register extends Component {
  state = { name: "", email: "", password: "", confirmPassword: "" };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      message.error({ content: "Passwords don't match!" });
      return;
    }

    try {
      const res = await axios.post(
        `https://solace-hack-kj.herokuapp.com/api/users/sign-up`,
        {
          name,
          email,
          password,
        }
      );
      const token = res["data"]["token"];
      this.props.setUser(token);

      message.success({
        content: "Registered Successfully!",
        duration: 5,
        className: "my-message",
      });

      history.push("/home");
    } catch (error) {
      message.error({
        content: "Registration Failed!",
        duration: 5,
        className: "my-message",
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ ...this.state, [name]: value });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="container-fluid p-0">
            <div className="row m-0">
              <div className="col-lg-6  align-self-center p-0">
                <div className="row m-0 justify-content-center">
                  <form className="mt-0" onSubmit={this.handleSubmit}>
                    <div className="logdet">Register</div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Enter Email"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="Choose Password"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        placeholder="Confirm Password"
                      />
                    </div>

                    <div
                      className=" form-group d-flex justify-content-center"
                      id="btn"
                    >
                      <button type="submit" className="btn btn-block">
                        Sign Up
                      </button>
                    </div>
                    <p className="foot">
                      Already have an account?
                      <Link
                        to="/login"
                        style={{ color: "#ce907e", paddingLeft: "3px" }}
                      >
                        Sign In
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 p-0">
                <img
                  alt="corona-img"
                  src={CoronaImg}
                  className="img-responsive fit-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (token) => dispatch(setUser(token)),
});

export default connect(null, mapDispatchToProps)(Register);
