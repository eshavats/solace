import React, { Component } from "react";
import "./Register.css";
import CoronaImg from "./img/corona1.gif";

class Register extends Component {
  state = { name: "", email: "", password: "", confirmPassword: "" };

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      alert("passwords don't match");
      return;
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
                      <a
                        href="/login"
                        style={{ color: "#ce907e", paddingLeft: "3px" }}
                      >
                        Sign In
                      </a>
                    </p>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 p-0">
                <img src={CoronaImg} className="img-responsive fit-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
